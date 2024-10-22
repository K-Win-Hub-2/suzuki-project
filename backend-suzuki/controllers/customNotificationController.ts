import { Request, Response } from "express";
import customNotificationService from "../services/customNotificationService";
import mongoose from "mongoose";

export const listAllNotifications = async (req: Request, res: Response) => {
  const data = await customNotificationService.listAllNotifications();
  res.status(data.statusCode).json(data);
};

export const createNotification = async (req: Request, res: Response) => {
  const data = await customNotificationService.createNotification(req.body);
  res.status(data.statusCode).json(data);
};

export const getNotificationById = async (req: Request, res: Response) => {
  const data = await customNotificationService.getNotificationById(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};

export const updateNotificationById = async (req: Request, res: Response) => {
  const data = await customNotificationService.updateNotificationById(
    new mongoose.Types.ObjectId(req.params.id),
    req.body
  );
  res.status(data.statusCode).json(data);
};

export const deleteNotification = async (req: Request, res: Response) => {
  const data = await customNotificationService.deleteCustomNotification(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};
