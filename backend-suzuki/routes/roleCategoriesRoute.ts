import { Express } from "express";
import catchError from "../lib/catchError";
import { verifyToken } from "../middlewares/verifyToken";

import {
  createRole,
  createRoleOnly,
  getRole,
  updateRole,
} from "../controllers/roleCategoriesController";

module.exports = (app: Express): void => {
  app.route("/api/v1/roleCategories").post(verifyToken, catchError(createRole));

  app
    .route("/api/v1/roleCategoriesOnly")
    .post(verifyToken, catchError(createRoleOnly));

  app.route("/api/v1/roleCategories").get(verifyToken, catchError(getRole));

  app
    .route("/api/v1/roleCategories/:id")
    .put(verifyToken, catchError(updateRole));
};
