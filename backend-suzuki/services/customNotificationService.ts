import { CustomNotificationModel } from "../models/customNotification";
import { successResponse, errorResponse } from "../helpers/responseHelper";
import mongoose from "mongoose";

class CustomNotificationClass {
  constructor() {}

  async listAllNotifications() {
    try {
      const notificationsDoc = await CustomNotificationModel.find();

      return successResponse({
        statusCode: 200,
        message: "These are all notifications",
        data: notificationsDoc,
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return errorResponse({
        statusCode: 500,
        message: "Error fetching notifications",
        data: error,
      });
    }
  }

  async createNotification(data: any) {
    try {
      const notificationDoc = await CustomNotificationModel.create(data);

      return successResponse({
        statusCode: 201,
        message: "Notification created",
        data: notificationDoc,
      });
    } catch (error) {
      console.error("Error creating notification:", error);
      return errorResponse({
        statusCode: 500,
        message: "Error creating notification",
        data: error,
      });
    }
  }

  async getNotificationById(id: mongoose.Types.ObjectId) {
    try {
      const notificationDoc = await CustomNotificationModel.findById(id);

      return successResponse({
        statusCode: 200,
        message: "This is notification by id",
        data: notificationDoc,
      });
    } catch (error) {
      console.error("Error fetching notification by id:", error);
      return errorResponse({
        statusCode: 500,
        message: "Error fetching notification by id",
        data: error,
      });
    }
  }

  async updateNotificationById(id: mongoose.Types.ObjectId, data: any) {
    try {
      const notificationDoc = await CustomNotificationModel.findByIdAndUpdate(
        {
          _id: id,
        },
        data,
        {
          new: true,
        }
      );

      return successResponse({
        statusCode: 200,
        message: "Notification updated",
        data: notificationDoc,
      });
    } catch (error) {
      console.error("Error updating notification by id:", error);
      return errorResponse({
        statusCode: 500,
        message: "Error updating notification by id",
        data: error,
      });
    }
  }

  async deleteCustomNotification(id: mongoose.Types.ObjectId) {
    try {
      let query = {
        _id: id,
        isDeleted: true,
      };

      const result = await CustomNotificationModel.findByIdAndUpdate(query);

      return successResponse({
        statusCode: 200,
        message: "Notification deleted successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error deleting notification by id:", error);
      return errorResponse({
        statusCode: 500,
        message: "Error deleting notification by id",
        data: error,
      });
    }
  }
}

export default new CustomNotificationClass();
