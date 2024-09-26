import { Express } from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { checkAdminType } from "../validators/authCheck"
import catchError from "../lib/catchError"
import { createCarPartStock, deleteCarPartStock, listAllCarPartStock, readCarPartStock, updateCarPartStock, updateCarPartStockByAll } from "../controllers/carPartStockController"
import S3UploadImage from "../lib/fileUploader"

module.exports = (app: Express): void =>{
    app.route("/api/v1/car-part-stocks")
        .get(verifyToken, catchError(listAllCarPartStock))
        .post(verifyToken, checkAdminType, S3UploadImage.single("car_part_stock"), catchError(createCarPartStock))
    
    app.route("/api/v1/car-part-stock-by-admin/:id")
        .put(verifyToken, checkAdminType, S3UploadImage.single("car_part_stock"), catchError(updateCarPartStockByAll))

    app.route("/api/v1/car-part-stock/:id")
       .put(verifyToken, checkAdminType, S3UploadImage.single("car_part_stock"), catchError(updateCarPartStock))
       .get(verifyToken, catchError(readCarPartStock))
       .delete(verifyToken, checkAdminType, catchError(deleteCarPartStock))
}