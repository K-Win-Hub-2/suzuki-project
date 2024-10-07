import { Express } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import catchError from "../lib/catchError";
import { markAsRead } from "../controllers/notificationsController";

module.exports = (app: Express): void => {
  app.route("/api/v1/notification/mark-as-read").put(catchError(markAsRead));
};
