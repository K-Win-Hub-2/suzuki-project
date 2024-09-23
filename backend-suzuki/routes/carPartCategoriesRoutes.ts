import { Express } from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { checkAdminType } from "../validators/authCheck"
import catchError from "../lib/catchError"
import { createCarPartCategoriesModel, deleteCarPartCategoriesModel, listAllCarPartCategories, readCarPartCategoriesModel, updateCarPartCategoriesModel } from "../controllers/carPartCategories"
module.exports = (app: Express): void =>{
    app.route("/api/v1/car-part-categories")
        .get(verifyToken, catchError(listAllCarPartCategories))
        .post(verifyToken, checkAdminType, catchError(createCarPartCategoriesModel))

    app.route("/api/v1/car-part-category/:id")
       .put(verifyToken, checkAdminType, catchError(updateCarPartCategoriesModel))
       .get(verifyToken, catchError(readCarPartCategoriesModel))
       .delete(verifyToken, checkAdminType, catchError(deleteCarPartCategoriesModel))
}