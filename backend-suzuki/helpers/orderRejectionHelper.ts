import mongoose from "mongoose";
import { Order, OrderModels } from "../models/orderModel";

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
  } else if (allItemsCompleted) {
    mainOrderDoc.status = OrderStatus.Completed;
  } else {
    mainOrderDoc.status = OrderStatus.In_Progress;
  }

  const result = await OrderModels.findByIdAndUpdate(id, mainOrderDoc, {
    new: true,
  });

  return result;
};
