import { Express, Request, Response } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  createUser,
  listAllUser,
  readUser,
  updateUser,
  deleteUser,
  listDealers,
} from "../controllers/userController";
import { checkAdminOrSelf, checkAdminType } from "../validators/authCheck";
import S3UploadImage from "../lib/fileUploader";
import catchError from "../lib/catchError";
module.exports = (app: Express): void => {
  app
    .route("/api/v1/users")
    .get(verifyToken, checkAdminType, catchError(listAllUser))
    .post(S3UploadImage.single("image"), catchError(createUser));

  app
    .route("/api/v1/user/:id")
    .put(
      verifyToken,
      checkAdminOrSelf,
      S3UploadImage.single("image"),
      catchError(updateUser)
    )
    .get(verifyToken, catchError(readUser))
    .delete(verifyToken, checkAdminOrSelf, catchError(deleteUser));

  app.route("/api/v1/list-dealers").get(catchError(listDealers));
};
