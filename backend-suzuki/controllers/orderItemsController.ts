import { Request, Response } from "express";
import mongoose from "mongoose";
import OrderItemClass from "../services/orderItemsService";

export const listAllOrderItems = async (req: Request, res: Response) => {
  const data = await OrderItemClass.listAllOrderItems(req.query);
  res.status(data.statusCode).json(data);
};

export const createOrderItem = async (req: Request, res: Response) => {
  const data = await OrderItemClass.createOrderItem(req.body);
  res.status(data.statusCode).json(data);
};

export const getOrderItemById = async (req: Request, res: Response) => {
  const data = await OrderItemClass.getOrderItemById(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};

export const updateOrderItemById = async (req: Request, res: Response) => {
  const data = await OrderItemClass.updateOrderItemById(
    new mongoose.Types.ObjectId(req.params.id),
    req.body
  );
  res.status(data.statusCode).json(data);
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  const data = await OrderItemClass.deleteOrderItem(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};
