import { Express } from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { checkAdminType } from "../validators/authCheck"
import catchError from "../lib/catchError"
import { createCarPartStock, deleteCarPartStock, listAllCarPartStock, readCarPartStock, updateCarPartStock } from "../controllers/carPartStockController"
module.exports = (app: Express): void =>{
    app.route("/api/v1/car-part-stocks")
        .get(verifyToken, catchError(listAllCarPartStock))
        .post(verifyToken, checkAdminType, catchError(createCarPartStock))

    app.route("/api/v1/car-part-stock/:id")
       .put(verifyToken, checkAdminType, catchError(updateCarPartStock))
       .get(verifyToken, catchError(readCarPartStock))
       .delete(verifyToken, checkAdminType, catchError(deleteCarPartStock))
}