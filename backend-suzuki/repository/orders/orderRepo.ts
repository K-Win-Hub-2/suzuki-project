import { FilterQuery, Document } from "mongoose";
import { Order } from "../../models/orderModel";

export interface OrderRepository {
  listAll(datas: FilterQuery<Order>): Promise<Order[]>;
}
