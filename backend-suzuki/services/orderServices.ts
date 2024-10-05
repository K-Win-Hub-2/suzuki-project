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
        });

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

  async createOrder(
    data: Partial<Order>
    // orderItems: Partial<OrderItemDocRef>
  ) {
    // console.log(orderItems);
    try {
      //Generate Order Number
      const currentDate: Date = new Date();
      const day: String = String(currentDate.getDay()).padStart(2, "0");
      const year: String = String(currentDate.getFullYear());
      const month: String = String(currentDate.getMonth() + 1).padStart(2, "0");
      const datePart: String = `${day}${month}${year}`;

      const orderNumber = `SHIN-${datePart}`;

      // const orderData = { ...data, orderNumber, smallOrder: savedOrderItems };

      const orderData = {
        ...data,
        orderNumber,
        smallOrder: data.smallOrder?.map((item: Partial<OrderItemDocRef>) => ({
          item_id: item.item_id,
          partNumber: item.partNumber,
          partName: item.partName,
          price: item.price,
          quantity: item.quantity,
          qtyChangeStatus: item.qtyChangeStatus ?? false, // Default if not provided
          priceChangeStatus: item.priceChangeStatus ?? false, // Default if not provided
          status: OrderStatus.In_Progress, // Default status
        })),
      };

      const result = await OrderModels.create(orderData);

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
      const result = await OrderModels.findById(id);

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
    status?: OrderStatus,
    remark?: string,
    confirmQuantity?: Number,
    confirmPrice?: Number,
    newItems?: OrderItemDocRef[]
  ) {
    try {
      const oldOrder = await OrderModels.findById(id);

      if (!oldOrder) {
        throw new Error("Order not found");
      }

      if (newItems && Array.isArray(newItems)) {
        oldOrder.smallOrder = oldOrder.smallOrder.map((orderItem: any) => {
          const newItem = newItems.find(
            (item) => item.item_id?.toString() === orderItem.item_id?.toString()
          );

          if (!newItem) return orderItem;

          return {
            ...orderItem,
            status: newItem.status || orderItem.status,
            partNumber: newItem.partNumber || orderItem.partNumber,
            partName: newItem.partName || orderItem.partName,
            price: newItem.price || orderItem.price,
            quantity: newItem.quantity || orderItem.quantity,
            qtyChangeStatus:
              newItem.qtyChangeStatus ?? orderItem.qtyChangeStatus,
            priceChangeStatus:
              newItem.priceChangeStatus ?? orderItem.priceChangeStatus,
            confirmQuantity:
              newItem.confirmQuantity || orderItem.confirmQuantity,
            confirmPrice: newItem.confirmPrice || orderItem.confirmPrice,
          };
        });

        oldOrder.markModified("smallOrder");
      }

      const result = await oldOrder.save();

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
