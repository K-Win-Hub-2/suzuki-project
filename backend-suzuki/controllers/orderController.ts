import { Request, Response } from "express";
import MainOrderClass from "../services/orderServices";
import mongoose from "mongoose";
import { Order } from "../models/orderModel";

export const listAllOrders = async (req: Request, res: Response) => {
  const data = await MainOrderClass.listAllOrders();
  res.status(data.statusCode).json(data);
};

export const getOrderById = async (req: Request, res: Response) => {
  const data = await MainOrderClass.getOrderById(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};

export const createOrder = async (req: Request, res: Response) => {
  const data = await MainOrderClass.createOrder(req.body);
  res.status(data!.statusCode).json(data);
};

export const updateOrderById = async (req: Request, res: Response) => {
  const { status, remark, newItems, confirmQuantity, confirmPrice } = req.body;

  const data = await MainOrderClass.updateOrderbyId(
    new mongoose.Types.ObjectId(req.params.id),
    status,
    remark,
    confirmQuantity,
    confirmPrice,
    newItems
  );

  res.status(data.statusCode).json(data);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const data = await MainOrderClass.deleteOrder(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};
