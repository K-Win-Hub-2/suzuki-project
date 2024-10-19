import { Express } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { checkAdminType } from "../validators/authCheck";
import catchError from "../lib/catchError";
import {
  createCarPartStock,
  deleteCarPartStock,
  listAllCarPartStock,
  readCarPartStock,
  updateCarPartStock,
  updateCarPartStockByAll,
  CheckAllStocksByDelear,
  CheckAllStocksByTownShipAndRegion,
  checkStockAvailabilityController,
} from "../controllers/carPartStockController";
import S3UploadImage from "../lib/fileUploader";
import { createWithExcel } from "../controllers/excelController";
import uploadStorage from "../lib/localFileUploader";

module.exports = (app: Express): void => {
  app
    .route("/api/v1/car-part-stocks")
    .get(catchError(listAllCarPartStock))
    .post(
      verifyToken,
      checkAdminType,
      S3UploadImage.single("car_part_stock"),
      catchError(createCarPartStock)
    );

  app
    .route("/api/v1/car-part-stocks/admin")
    .get(verifyToken, checkAdminType, catchError);

  app
    .route("/api/v1/car-part-stock-by-admin/:id")
    .put(
      verifyToken,
      checkAdminType,
      S3UploadImage.single("car_part_stock"),
      catchError(updateCarPartStockByAll)
    );

  app
    .route("/api/v1/car-part-stock/:id")
    .put(
      verifyToken,
      checkAdminType,
      S3UploadImage.single("car_part_stock"),
      catchError(updateCarPartStock)
    )
    .get(verifyToken, catchError(readCarPartStock))
    .delete(verifyToken, checkAdminType, catchError(deleteCarPartStock));

  app
    .route("/api/v1/admin/excel/import")
    .post(uploadStorage.single("excel"), catchError(createWithExcel));

  app.get("/api/v1/check-stocks-dealer", catchError(CheckAllStocksByDelear));

  app.get(
    "/api/v1/check-stocks-township-region",
    catchError(CheckAllStocksByTownShipAndRegion)
  );

  app.get(
    "/api/v1/check-stocks-available",
    catchError(checkStockAvailabilityController)
  );
};
