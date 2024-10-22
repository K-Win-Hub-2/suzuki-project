import { Express } from "express";
import catchError from "../lib/catchError";

import {
  createNotification,
  listAllNotifications,
  deleteNotification,
  getNotificationById,
  updateNotificationById,
} from "../controllers/customNotificationController";

module.exports = (app: Express): void => {
  app
    .route("/api/v1/notifications")
    .get(catchError(listAllNotifications))
    .post(catchError(createNotification));

  app
    .route("/api/v1/notification/:id")
    .put(catchError(updateNotificationById))
    .get(catchError(getNotificationById))
    .delete(catchError(deleteNotification));
};
