import mongoose from "mongoose";
import { successResponse, errorResponse } from "../helpers/responseHelper";
import { FeedbackModel } from "../models/feedbackModel";

class FeedbackServices {
  constructor() {}

  async listAllFeedbacks() {
    try {
      const feedbackDoc = await FeedbackModel.find().populate(
        "customerId orderId"
      );

      return successResponse({
        statusCode: 200,
        message: "These are all feedbacks",
        data: feedbackDoc,
      });
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      return errorResponse({
        statusCode: 500,
        message: "Error fetching feedbacks",
        data: error,
      });
    }
  }

  async createFeedback(data: Partial<FeedbackModel>) {
    try {
      const feedbackDoc = await FeedbackModel.create(data);

      return successResponse({
        statusCode: 200,
        message: "Feedback created",
        data: feedbackDoc,
      });
    } catch (error) {
      console.error("Error creating feedback:", error);
      return errorResponse({
        statusCode: 500,
        message: "Error creating feedback",
        data: error,
      });
    }
  }

  async updateFeedbackById(id: mongoose.Types.ObjectId, data: any) {
    try {
      const feedbackDoc = await FeedbackModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      return successResponse({
        statusCode: 200,
        message: "Feedback updated",
        data: feedbackDoc,
      });
    } catch (error) {
      console.error("Error updating feedback:", error);
      return errorResponse({
        statusCode: 500,
        message: "Error updating feedback",
        data: error,
      });
    }
  }

  async deleteFeedback(id: mongoose.Types.ObjectId) {
    try {
      const feedbackDoc = await FeedbackModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });

      return successResponse({
        statusCode: 200,
        message: "Feedback deleted",
        data: feedbackDoc,
      });
    } catch (error) {
      console.error("Error deleting feedback:", error);
      return errorResponse({
        statusCode: 500,
        message: "Error deleting feedback",
        data: error,
      });
    }
  }

  async getFeedbackById(id: mongoose.Types.ObjectId) {
    try {
      const feedbackDoc = await FeedbackModel.findById(id).populate(
        "customerId orderId"
      );

      return successResponse({
        statusCode: 200,
        message: "Feedback found",
        data: feedbackDoc,
      });
    } catch (error) {
      console.error("Error fetching feedback:", error);
      return errorResponse({
        statusCode: 500,
        message: "Error fetching feedback",
        data: error,
      });
    }
  }
}

export default new FeedbackServices();
