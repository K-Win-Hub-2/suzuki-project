import { Express } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import catchError from "../lib/catchError";

import {
  createFeedback,
  deleteFeedback,
  getFeedbackById,
  listAllFeedbacks,
  updateFeedbackById,
} from "../controllers/feedbackController";

module.exports = (app: Express): void => {
  app
    .route("/api/v1/feedbacks")
    .get(catchError(listAllFeedbacks))
    .post(catchError(createFeedback));

  app
    .route("/api/v1/feedback/:id")
    .get(catchError(getFeedbackById))
    .put(catchError(updateFeedbackById))
    .delete(catchError(deleteFeedback));
};
