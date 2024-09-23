import { Express , Request, Response} from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { createTownship, deleteTownship, listAllTownship, readTownship, updateTownship } from "../controllers/townshipController"


module.exports = (app: Express) =>{
    app.route("/api/v1/townships")
        .get(verifyToken, listAllTownship)
        .post(verifyToken, createTownship)

    app.route("/api/v1/township/:id")
       .put(verifyToken, updateTownship)
       .get(verifyToken, readTownship)
       .delete(verifyToken, deleteTownship)
}