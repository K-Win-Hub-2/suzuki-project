import { Request, Response } from "express";
import MainOrderClass from "../services/orderServices";
import mongoose from "mongoose";
import { Order } from "../models/orderModel";

export const listAllOrders = async (req: Request, res: Response) => {
  const data = await MainOrderClass.listAllOrders(req.query);
  res.status(data.statusCode).json(data);
};

export const getOrderById = async (req: Request, res: Response) => {
  const data = await MainOrderClass.getOrderById(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};

export const createOrder = async (req: Request, res: Response) => {
  const { smallOrder } = req.body;

  // const files: Express.Multer.File[] = req.files as Express.Multer.File[];
  const data = await MainOrderClass.createOrder(
    req.body,
    smallOrder,
    req.files
  );
  res.status(data.statusCode).json(data);
};

export const updateOrderById = async (req: Request, res: Response) => {
  let { qtyChangeStatus, priceChangeStatus } = req.query;

  const updateData: Partial<Order> = {
    ...req.body,
  };

  // if (qtyChangeStatus) {
  //   updateData.qtyChangeStatus = qtyChangeStatus as string;
  // }

  // if (priceChangeStatus) {
  //   updateData.priceChangeStatus = priceChangeStatus as string;
  // }

  const data = await MainOrderClass.updateOrderbyId(
    new mongoose.Types.ObjectId(req.params.id),
    req.body
  );

  res.status(data.statusCode).json(data);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const data = await MainOrderClass.deleteOrder(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};
