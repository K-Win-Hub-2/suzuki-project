import mongoose, { FilterQuery } from "mongoose";
import "dotenv/config";
import { OrderModels, Order } from "../models/orderModel";
import { successResponse, errorResponse } from "../helpers/responseHelper";
import { OrderFilterQuery } from "../helpers/orderListFilter";
import { OrderItemModels, OrderItem } from "../models/orderItemModel";

class MainOrderClass {
  constructor() {}

  async listAllOrders(datas: FilterQuery<Order>) {
    try {
      const filterQuery = OrderFilterQuery(datas);
      const ordersDoc = await OrderModels.find(filterQuery)
        .populate("customer")
        .populate("dealer");

      return successResponse({
        statusCode: 200,
        message: "These are all orders",
        data: ordersDoc,
      });
    } catch (err) {
      return errorResponse({
        statusCode: 500,
        message: "Error fetching orders",
        data: err,
      });
    }
  }

  async createOrder(data: Partial<Order>, orderItems: Partial<OrderItem>[]) {
    try {
      const savedOrderItems = [];

      for (const items of orderItems) {
        if (typeof items !== "object" || items === null) {
          throw new Error("OrderItem is not a valid object.");
        }
        const orderItem = await OrderItemModels.create(items);

        savedOrderItems.push({
          items_id: orderItem._id,
          partNumber: orderItem.partNumber,
          partName: orderItem.partName,
          price: orderItem.price,
          quantity: orderItem.quantity,
          qtyChangeStatus: orderItem.qtyChangeStatus,
          imgURL: orderItem.imgURL,
          priceChangeStatus: orderItem.priceChangeStatus,
        });
      }

      //Generate Order Number
      const currentDate: Date = new Date();
      const day: String = String(currentDate.getDay()).padStart(2, "0");
      const year: String = String(currentDate.getFullYear());
      const month: String = String(currentDate.getMonth() + 1).padStart(2, "0");
      const datePart: String = `${day}${month}${year}`;

      const orderNumber = `SHIN-${datePart}`;

      const orderData = { ...data, orderNumber, smallOrder: savedOrderItems };

      const result = await OrderModels.create(orderData);

      return successResponse({
        statusCode: 200,
        message: "Order Created successfully",
        data: result,
      });
    } catch (error) {
      console.error(error);
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
    data: Order,
    OrderItem: Partial<OrderItem>
  ) {
    try {
      if (OrderItem && Array.isArray(OrderItem)) {
        for (const item of OrderItem) {
          if (item.qtyChangeStatus || item.priceChangeStatus) {
            await OrderItemModels.findByIdAndUpdate(item._id, item, {
              new: true,
            });
          }
        }
      }

      const result = await OrderModels.findByIdAndUpdate(id, data, {
        new: true,
      });

      return successResponse({
        statusCode: 200,
        message: "Order Updated successfully",
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
      const result = await OrderModels.deleteOne({
        _id: id,
      });

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
