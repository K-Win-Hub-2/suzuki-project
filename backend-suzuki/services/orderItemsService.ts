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

  async createOrderItem(data: Partial<OrderItem>, files: any) {
    try {
      const partImgURL =
        files["partImage"] && files["partImage"][0]
          ? files["partImage"][0].location
          : null;

      const colorImgURL =
        files["colorImage"] && files["colorImage"][0]
          ? files["colorImage"][0].location
          : null;

      const orderItemData = {
        ...data,
        partImgURL,
        colorImgURL,
      };

      const result = await OrderItemModels.create(orderItemData);

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

  async updateOrderItemById(
    id: mongoose.Types.ObjectId,
    data: OrderItem,
    files: any
  ) {
    try {
      const colorImgURL =
        files["colorImage"] && files["colorImage"][0]
          ? files["colorImage"][0].location
          : null;

      const updateItemData = {
        ...data,
        colorImgURL,
      };

      const result = await OrderItemModels.findByIdAndUpdate(
        id,
        updateItemData,
        {
          new: true,
        }
      );

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
      let query = {
        _id: id,
        isDeleted: false,
      };

      const result = await OrderItemModels.findByIdAndUpdate(query);

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
