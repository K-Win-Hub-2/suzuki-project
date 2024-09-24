import { Express } from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { checkAdminType } from "../validators/authCheck"
import S3UploadImage from "../lib/fileUploader"
import catchError from "../lib/catchError"
import { createCarModel, deleteCarModel, listAllCarModel, readCarModel, updateCarModel } from "../controllers/carModelController"
module.exports = (app: Express): void =>{
    app.route("/api/v1/car-models")
        .get(verifyToken, catchError(listAllCarModel))
        .post(verifyToken, S3UploadImage.single("car_model"), checkAdminType, catchError(createCarModel))

    app.route("/api/v1/car-model/:id")
       .put(verifyToken, S3UploadImage.single("car_model"), checkAdminType, catchError(updateCarModel))
       .get(verifyToken, catchError(readCarModel))
       .delete(verifyToken, checkAdminType, catchError(deleteCarModel))
}