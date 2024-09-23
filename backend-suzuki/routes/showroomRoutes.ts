import { Express } from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { createShowroom, listAllShowroom, readShowroom, updateShowroom, deleteShowroom } from "../controllers/showroomController"
import { checkAdminType } from "../validators/authCheck"
import S3UploadImage from "../lib/fileUploader"
import catchError from "../lib/catchError"
module.exports = (app: Express): void =>{
    app.route("/api/v1/showrooms")
        .get(verifyToken, checkAdminType, catchError(listAllShowroom))
        .post(verifyToken, S3UploadImage.single("showroom_image"), checkAdminType, catchError(createShowroom))

    app.route("/api/v1/showroom/:id")
       .put(verifyToken, S3UploadImage.single("showroom_image"), checkAdminType, catchError(updateShowroom))
       .get(verifyToken, catchError(readShowroom))
       .delete(verifyToken, checkAdminType, catchError(deleteShowroom))
}