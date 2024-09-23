import { Express} from "express"
import { login } from "../controllers/authController"
import catchError from "../lib/catchError"

module.exports = (app: Express) =>{
    app.route("/api/v1/auth/login")
        .post(catchError(login))
}