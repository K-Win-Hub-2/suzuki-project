import { Express } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  createUser,
  listAllUser,
  readUser,
  updateUser,
  deleteUser,
  listDealers,
  ListShippingMethod,
  ListAllRegions,
  ListAllTownShips,
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

  app.route("/api/v1/list-dealers").get(verifyToken, catchError(listDealers));

  app
    .route("/api/v1/shipping-method")
    .get(verifyToken, catchError(ListShippingMethod));

  app
    .route("/api/v1/list-regions")
    .get(verifyToken, catchError(ListAllRegions));

  app
    .route("/api/v1/list-townships")
    .get(verifyToken, catchError(ListAllTownShips));
};
