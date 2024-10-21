import { Express } from "express";
import catchError from "../lib/catchError";

import {
  createRole,
  createRoleOnly,
} from "../controllers/roleCategoriesController";

module.exports = (app: Express): void => {
  app.route("/api/v1/roleCategories").post(catchError(createRole));

  app.route("/api/v1/roleCategoriesOnly").post(catchError(createRoleOnly));
};
