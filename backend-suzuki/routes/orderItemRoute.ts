import { Express } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import catchError from "../lib/catchError";
import {
  createOrderItem,
  deleteOrderItem,
  getOrderItemById,
  listAllOrderItems,
  updateOrderItemById,
} from "../controllers/orderItemsController";
import S3UploadImage from "../lib/fileUploader";

module.exports = (app: Express): void => {
  app
    .route("/api/v1/order-items")
    .get(catchError(listAllOrderItems))
    .post(
      S3UploadImage.fields([
        { name: "partImage", maxCount: 1 },
        { name: "colorImage", maxCount: 1 },
      ]),
      catchError(createOrderItem)
    );

  app
    .route("/api/v1/order-item/:id")
    .put(
      S3UploadImage.fields([{ name: "colorImage", maxCount: 1 }]),
      catchError(updateOrderItemById)
    )
    .get(verifyToken, catchError(getOrderItemById))
    .delete(verifyToken, catchError(deleteOrderItem));
};
