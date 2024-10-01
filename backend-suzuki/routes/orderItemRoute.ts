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

module.exports = (app: Express): void => {
  app
    .route("/api/v1/order-items")
    .get(verifyToken, catchError(listAllOrderItems))
    .post(verifyToken, catchError(createOrderItem));

  app
    .route("/api/v1/order-item/:id")
    .put(verifyToken, catchError(updateOrderItemById))
    .get(verifyToken, catchError(getOrderItemById))
    .delete(verifyToken, catchError(deleteOrderItem));
};
