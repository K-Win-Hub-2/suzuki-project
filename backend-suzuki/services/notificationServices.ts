import mongoose from "mongoose";
import { NotificationModels } from "../models/notificationModel";
import { successResponse, errorResponse } from "../helpers/responseHelper";

class NotificationClass {
  constructor() {}

  async markAsRead(id: mongoose.Types.ObjectId) {
    try {
      const notificationDoc = await NotificationModels.findById(id);

      if (!notificationDoc) {
        throw new Error("Notification not found");
      }

      notificationDoc.isRead = true;
      await notificationDoc.save();

      return successResponse({
        statusCode: 200,
        message: "Notification marked as read",
        data: notificationDoc,
      });
    } catch (error) {
      return errorResponse({
        statusCode: 500,
        message: "Error marking notification as read",
        data: error,
      });
    }
  }

  async getUnreadNotificationForUser(userId: mongoose.Types.ObjectId) {
    try {
      const unreadNotifications = await NotificationModels.find({
        customer_id: userId,
        isRead: false,
      }).sort({ createdAt: -1 });

      return successResponse({
        statusCode: 200,
        message: "Unread notifications fetched successfully",
        data: unreadNotifications,
      });
    } catch (error) {
      return errorResponse({
        statusCode: 500,
        message: "Error fetching unread notifications",
        data: error,
      });
    }
  }

  async getNotificationForUser(userId: mongoose.Types.ObjectId) {
    try {
      const notificationUserDoc = await NotificationModels.find({
        customer_id: userId,
      }).sort({ createdAt: -1 });

      return successResponse({
        statusCode: 200,
        message: "Notifications fetched successfully",
        data: notificationUserDoc,
      });
    } catch (error) {
      return errorResponse({
        statusCode: 500,
        message: "Error fetching notifications",
        data: error,
      });
    }
  }
}

export default new NotificationClass();
