import mongoose from "mongoose";
import feedbackServices from "../services/feedbackServices";
import { Request, Response } from "express";

export const listAllFeedbacks = async (req: Request, res: Response) => {
  const data = await feedbackServices.listAllFeedbacks();
  res.status(data.statusCode).json(data);
};

export const createFeedback = async (req: Request, res: Response) => {
  const data = await feedbackServices.createFeedback(req.body);
  res.status(data.statusCode).json(data);
};

export const updateFeedbackById = async (req: Request, res: Response) => {
  const data = await feedbackServices.updateFeedbackById(
    new mongoose.Types.ObjectId(req.params.id),
    req.body
  );
  res.status(data.statusCode).json(data);
};

export const deleteFeedback = async (req: Request, res: Response) => {
  const data = await feedbackServices.deleteFeedback(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};

export const getFeedbackById = async (req: Request, res: Response) => {
  const data = await feedbackServices.getFeedbackById(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};
