import mongoose, { FilterQuery } from "mongoose";
import "dotenv/config";
import { Order } from "../models/orderModel";
import { OrderRepository } from "../repository/orders/orderRepo";

export class OrderService {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async listAllOrdes(datas: FilterQuery<Order>) {
    return this.orderRepository.listAll(datas);
  }
}
