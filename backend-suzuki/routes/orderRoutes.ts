import { Express } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import catchError from "../lib/catchError";
import S3UploadImage from "../lib/fileUploader";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  listAllOrders,
  updateOrderById,
} from "../controllers/orderController";

module.exports = (app: Express): void => {
  app
    .route("/api/v1/orders")
    .get(verifyToken, catchError(listAllOrders)) // Remind : Verify Token
    .post(verifyToken, catchError(createOrder));

  app
    .route("/api/v1/order/:id")
    .put(verifyToken, catchError(updateOrderById))
    .get(verifyToken, catchError(getOrderById))
    .delete(verifyToken, catchError(deleteOrder));
};
