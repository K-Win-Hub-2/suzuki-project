import mongoose from "mongoose";
import { Order, OrderModels } from "../models/orderModel";
import { io } from "../app";
import { NotificationModels } from "../models/notificationModel";

enum OrderStatus {
  In_Progress = "In Progress",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export const OrderRejection = async (
  mainOrderDoc: Partial<Order>,
  id: mongoose.Types.ObjectId
) => {
  const allItemsCancelled = mainOrderDoc.smallOrder?.every(
    (orderItem) => orderItem.status === OrderStatus.Cancelled
  );

  const allItemsCompleted = mainOrderDoc.smallOrder?.every(
    (orderItem) => orderItem.status === OrderStatus.Completed
  );

  if (allItemsCancelled) {
    mainOrderDoc.status = OrderStatus.Cancelled;

    io.emit("orderCancelled", {
      message: "Order Cancelled",
      order: mainOrderDoc,
    });

    // Check with id from parameter (order id) with order_id in notification model if they match change title and message for notifications docs

    await NotificationModels.updateOne(
      { order_id: id },
      {
        title: "Order Cancelled",
        message: `Order ${mainOrderDoc.orderNumber} has been cancelled`,
      }
    );
  } else if (allItemsCompleted) {
    mainOrderDoc.status = OrderStatus.Completed;

    io.emit("orderCompleted", {
      message: "Your order have been approved",
      order: mainOrderDoc,
    });

    // Check with id from parameter (order id) with order_id in notification model if they match change title and message for notifications docs
    await NotificationModels.updateOne(
      {
        order_id: id,
      },
      {
        title: "Order Completed",
        message: `Order ${mainOrderDoc.orderNumber} has been completed`,
      }
    );
  } else {
    mainOrderDoc.status = OrderStatus.In_Progress;
  }

  const result = await OrderModels.findByIdAndUpdate(id, mainOrderDoc, {
    new: true,
  });

  return result;
};
