import { Request, Response } from "express";
import mongoose from "mongoose";
import NotificationClass from "../services/notificationServices";

export const markAsRead = async (req: Request, res: Response) => {
  const data = await NotificationClass.markAsRead(
    new mongoose.Types.ObjectId(req.params.id)
  );

  res.status(data.statusCode).json(data);
};

export const getNotificationForUser = async (req: Request, res: Response) => {
  const data = await NotificationClass.getNotificationForUser(
    new mongoose.Types.ObjectId(req.params.userId)
  );
};
