import { Request, Response } from "express";
import MainOrderClass from "../services/orderServices";
import mongoose from "mongoose";
import { OrderFilterCriteria } from "../helpers/orderListFilter";

export const listAllOrders = async (req: Request, res: Response) => {
  const filter: OrderFilterCriteria = {
    startDate: req.query.startDate
      ? new Date(req.query.startDate as string)
      : undefined,
    endDate: req.query.endDate
      ? new Date(req.query.endDate as string)
      : undefined,
    dealer: req.query.dealer as string,
    customerName: req.query.customerName as string,
    customerPhone: req.query.customerPhone as string,
    orderNumber: req.query.orderNumber as string,
  };

  const data = await MainOrderClass.listAllOrders(filter);

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
  const { newItems } = req.body;

  const data = await MainOrderClass.updateOrderbyId(
    new mongoose.Types.ObjectId(req.params.id),
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
