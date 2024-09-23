import { Express } from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { checkAdminType } from "../validators/authCheck"
import catchError from "../lib/catchError"
import { createCarPartTitle, deleteCarPartTitle, listAllCarPartTitle, readCarPartTitle, updateCarPartTitle } from "../controllers/carPartTitleController"

module.exports = (app: Express): void =>{
    app.route("/api/v1/car-part-titles")
        .get(verifyToken, catchError(listAllCarPartTitle))
        .post(verifyToken, checkAdminType, catchError(createCarPartTitle))

    app.route("/api/v1/car-part-title/:id")
       .put(verifyToken, checkAdminType, catchError(updateCarPartTitle))
       .get(verifyToken, catchError(readCarPartTitle))
       .delete(verifyToken, checkAdminType, catchError(deleteCarPartTitle))
}