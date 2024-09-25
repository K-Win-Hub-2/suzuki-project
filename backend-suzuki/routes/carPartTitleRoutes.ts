import { Express } from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { checkAdminType } from "../validators/authCheck"
import catchError from "../lib/catchError"
import { createCarPartTitle, deleteCarPartTitle, listAllCarPartTitle, readCarPartTitle, updateCarPartTitle } from "../controllers/carPartTitleController"
import S3UploadImage from "../lib/fileUploader"

module.exports = (app: Express): void =>{
    app.route("/api/v1/car-part-titles")
        .get(verifyToken, catchError(listAllCarPartTitle))
        .post(verifyToken, checkAdminType, S3UploadImage.single("car_part_title"), catchError(createCarPartTitle))

    app.route("/api/v1/car-part-title/:id")
       .put(verifyToken, checkAdminType, S3UploadImage.single("car_part_title"),  catchError(updateCarPartTitle))
       .get(verifyToken, catchError(readCarPartTitle))
       .delete(verifyToken, checkAdminType, catchError(deleteCarPartTitle))
       
}