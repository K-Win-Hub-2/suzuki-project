import { FilterQuery } from "mongoose";
import { Order } from "../models/orderModel";

interface OrderFilterCriteria {
  startDate?: Date;
  endDate?: Date;
  dealer?: string;
  customerName?: string;
  customerPhone?: string;
  orderNumber?: string;
}

export const OrderFilterQuery = (
  filter: OrderFilterCriteria
): FilterQuery<Order> => {
  let query: FilterQuery<Order> = { isDeleted: false };

  if (filter.startDate || filter.endDate) {
    query.orderDate = {};

    if (filter.startDate) {
      query.orderDate.$gte = filter.startDate;
    }

    if (filter.endDate) {
      query.orderDate.$lte = filter.endDate;
    }
  }

  if (filter.dealer) {
    query.dealer = { $regex: new RegExp(filter.dealer, "i") };
  }

  if (filter.customerName) {
    query.customer = { $regex: new RegExp(filter.customerName, "i") };
  }

  if (filter.customerPhone) {
    query.customer = { $regex: new RegExp(filter.customerPhone, "i") };
  }

  if (filter.orderNumber) {
    query.orderNumber = { $regex: new RegExp(filter.orderNumber, "i") };
  }

  return query;
};
