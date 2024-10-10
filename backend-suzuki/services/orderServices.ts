import mongoose from "mongoose";
import "dotenv/config";
import { OrderModels, Order } from "../models/orderModel";
import { successResponse, errorResponse } from "../helpers/responseHelper";
import { OrderItemDocRef } from "../models/orderModel";
import { OrderRejection } from "../helpers/orderRejectionHelper";
import {
  OrderFilterQuery,
  OrderFilterCriteria,
} from "../helpers/orderListFilter";
import { io } from "../app";
import { NotificationModels } from "../models/notificationModel";
import { CarPartStockModels } from "../models/carPartStockModel";

enum OrderStatus {
  In_Progress = "In Progress",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

class MainOrderClass {
  constructor() {}

  async listAllOrders(filter: OrderFilterCriteria) {
    try {
      const filterQuery = OrderFilterQuery(filter);

      const ordersDoc = await OrderModels.find(filterQuery)
        .populate("customer", "name phone address isBanned")
        .populate({
          path: "dealer",
          select: "name userName code isSuperAdmin address isBanned email",
          populate: {
            path: "showroom",
          },
        })
        .populate("smallOrder.item_id");

      return successResponse({
        statusCode: 200,
        message: "These are all orders",
        data: ordersDoc,
      });
    } catch (err) {
      console.error("Error fetching orders:", err);
      return errorResponse({
        statusCode: 500,
        message: "Error fetching orders",
        data: err,
      });
    }
  }

  async createOrder(data: Partial<Order>) {
    try {
      //Generate Order Number
      const currentDate: Date = new Date();
      const day: String = String(currentDate.getDay()).padStart(2, "0");
      const year: String = String(currentDate.getFullYear());
      const month: String = String(currentDate.getMonth() + 1).padStart(2, "0");
      const datePart: String = `${day}${month}${year}`;

      const orderNumber = `Suzuki-${datePart}`;

      const totalItem =
        data.smallOrder?.reduce(
          (sum, item) => sum + Number(item.orderQuantity || 0),
          0
        ) || 0;

      const totalSaleAmt =
        data.smallOrder?.reduce(
          (sum, item) => sum + Number(item.totalPrice || 0),
          0
        ) || 0;

      const orderData = {
        ...data,
        orderNumber,
        totalItem,
        totalSaleAmount: totalSaleAmt,
        smallOrder: data.smallOrder?.map((item: Partial<OrderItemDocRef>) => ({
          item_id: item.item_id,
          orderQuantity: item.orderQuantity,
          totalPrice: item.totalPrice,
          qtyChangeStatus: item.qtyChangeStatus ?? false,
          priceChangeStatus: item.priceChangeStatus ?? false,
          status: OrderStatus.In_Progress,
        })),
      };

      const result = await OrderModels.create(orderData);

      console.log("Order created successfully");

      io.emit("orderCreated", {
        message: "New Order Created",
        order: result,
      });

      // Create notification
      const notification = new NotificationModels({
        title: "New Order Created",
        message: `Order ${result.orderNumber} has been placed`,
        order_id: result._id,
        dealer_id: result.dealer,
        customer_id: result.customer,
      });

      await notification.save();

      return successResponse({
        statusCode: 200,
        message: "Order Created successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getOrderById(id: mongoose.Types.ObjectId) {
    try {
      const result = await OrderModels.findById(id)
        .populate("customer", "name phone address isBanned")
        .populate({
          path: "dealer",
          select: "name userName code isSuperAdmin address isBanned email",
          populate: {
            path: "showroom",
          },
        })
        .populate("smallOrder.item_id");

      return successResponse({
        statusCode: 200,
        message: "This is Order by id",
        data: result,
      });
    } catch (error) {
      return errorResponse({
        statusCode: 500,
        message: "Error fetching order by id",
        data: error,
      });
    }
  }

  async updateOrderbyId(
    id: mongoose.Types.ObjectId,
    newItems?: OrderItemDocRef[]
  ) {
    try {
      const oldOrder = await OrderModels.findById(id);

      if (!oldOrder) {
        throw new Error("Order not found");
      }

      console.log("new items", newItems);

      const totalItem =
        newItems?.reduce(
          (sum, item) => sum + Number(item.orderQuantity || 0),
          0
        ) || 0;

      const totalSaleAmt =
        newItems?.reduce(
          (sum, item) => sum + Number(item.totalPrice || 0),
          0
        ) || 0;

      oldOrder.totalItem = totalItem;
      oldOrder.totalSaleAmount = totalSaleAmt;

      if (newItems && Array.isArray(newItems)) {
        oldOrder.smallOrder = await Promise.all(
          oldOrder.smallOrder.map(async (orderItem: any) => {
            const newItem = newItems.find(
              (item) =>
                item.item_id?.toString() === orderItem.item_id?.toString()
            );

            if (!newItem) return orderItem;

            if (newItem.status === OrderStatus.Completed) {
              const carPartDoc = await CarPartStockModels.findById(
                orderItem.item_id
              );

              if (!carPartDoc) {
                throw new Error("Car Part not found");
              }

              carPartDoc.totalQuantity -= Number(newItem.confirmQuantity || 0);

              await carPartDoc.save();
            }

            return {
              ...orderItem,
              status: newItem.status || orderItem.status,
              orderQuantity: newItem.orderQuantity || orderItem.orderQuantity,
              qtyChangeStatus:
                newItem.qtyChangeStatus ?? orderItem.qtyChangeStatus,
              priceChangeStatus:
                newItem.priceChangeStatus ?? orderItem.priceChangeStatus,
              confirmQuantity:
                newItem.confirmQuantity || orderItem.confirmQuantity,
              confirmPrice: newItem.confirmPrice || orderItem.confirmPrice,
              remark: newItem.remark || orderItem.remark,
            };
          })
        );

        oldOrder.markModified("smallOrder");
      }

      const result = await oldOrder.save();

      console.log("Result", result);

      await OrderRejection(result, id);

      return successResponse({
        statusCode: 200,
        message: "Order updated successfully",
        data: result,
      });
    } catch (error) {
      return errorResponse({
        statusCode: 500,
        message: "Error updating order",
        data: error,
      });
    }
  }

  async deleteOrder(id: mongoose.Types.ObjectId) {
    try {
      let query = {
        _id: id,
        isDeleted: false,
      };

      const result = await OrderModels.findByIdAndUpdate(query);

      return successResponse({
        statusCode: 200,
        message: "Order deleted successfully",
        data: result,
      });
    } catch (error) {
      return errorResponse({
        statusCode: 500,
        message: "Error deleting order",
        data: error,
      });
    }
  }
}

export default new MainOrderClass();
