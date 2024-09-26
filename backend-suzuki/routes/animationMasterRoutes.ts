import { Express } from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { checkAdminType } from "../validators/authCheck"
import catchError from "../lib/catchError"
import S3UploadImage from "../lib/fileUploader"
import { createAnimationMaster, deleteAnimationMaster, listAllAnimationMaster, readAnimationMaster, updateAnimationMaster } from "../controllers/animationMasterController"

module.exports = (app: Express): void =>{
    app.route("/api/v1/animation-master")
        .get(verifyToken, catchError(listAllAnimationMaster))
        .post(verifyToken, checkAdminType, S3UploadImage.array("animation_master"), catchError(createAnimationMaster))

    app.route("/api/v1/animation-master/:id")
       .put(verifyToken, checkAdminType, S3UploadImage.array("animation_master"),  catchError(updateAnimationMaster))
       .get(verifyToken, catchError(readAnimationMaster))
       .delete(verifyToken, checkAdminType, catchError(deleteAnimationMaster))
       
}