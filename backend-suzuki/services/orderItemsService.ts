import mongoose, { FilterQuery } from "mongoose";
import { OrderItem, OrderItemModels } from "../models/orderItemModel";
import { successResponse, errorResponse } from "../helpers/responseHelper";

class OrderItemClass {
  constructor() {}

  async listAllOrderItems(datas: FilterQuery<OrderItem>) {
    try {
      const query: FilterQuery<OrderItem> = { isDeleted: false };

      const orderItemsDoc = await OrderItemModels.find(query);

      return successResponse({
        statusCode: 200,
        message: "These are all order items",
        data: orderItemsDoc,
      });
    } catch (error) {
      return errorResponse({
        statusCode: 500,
        message: "Error fetching order items",
        data: error,
      });
    }
  }

  async createOrderItem(data: OrderItem) {
    try {
      const result = await OrderItemModels.create(data);
      return successResponse({
        statusCode: 200,
        message: "Order Item Created successfully",
        data: result,
      });
    } catch (error) {
      return errorResponse({
        statusCode: 500,
        message: "Error creating order item",
        data: error,
      });
    }
  }

  async getOrderItemById(id: mongoose.Types.ObjectId) {
    try {
      const result = await OrderItemModels.findById(id);

      return successResponse({
        statusCode: 200,
        message: "This is Order Item by id",
        data: result,
      });
    } catch (error) {
      return errorResponse({
        statusCode: 500,
        message: "Error fetching order item by id",
        data: error,
      });
    }
  }

  async updateOrderItemById(id: mongoose.Types.ObjectId, data: OrderItem) {
    try {
      const result = await OrderItemModels.findByIdAndUpdate(id, data, {
        new: true,
      });

      return successResponse({
        statusCode: 200,
        message: "Order Item Updated successfully",
        data: result,
      });
    } catch (error) {
      return errorResponse({
        statusCode: 500,
        message: "Error updating order item",
        data: error,
      });
    }
  }

  async deleteOrderItem(id: mongoose.Types.ObjectId) {
    try {
      const result = await OrderItemModels.findByIdAndDelete(id);

      return successResponse({
        statusCode: 200,
        message: "Order Item Deleted successfully",
        data: result,
      });
    } catch (error) {
      return errorResponse({
        statusCode: 500,
        message: "Error deleting order item",
        data: error,
      });
    }
  }
}

export default new OrderItemClass();
