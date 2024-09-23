import jwt, { JwtPayload } from "jsonwebtoken"
import { errorResponse } from "../helpers/responseHelper"
import { getEnvString } from "../config/default"
import moment from "moment-timezone"
import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import { decode } from "punycode"

interface tokenData {
    id: mongoose.Types.ObjectId,
    email: string,
    isSuperAdmin: boolean
}

const generateToken = (data: tokenData): string => {
    const token = jwt.sign(data, getEnvString("SECRET"), {expiresIn: 24 * 2600})
    return token
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const timeNow: string =  moment().tz("Asia/Yangon").format()
    const bearerToken: string | undefined = req.headers['authorization']
    const token = bearerToken?.split("Bearer ")[1]
    //No token
    if(!token) return res.status(401).json(errorResponse({statusCode: 401, message: "Access denied. No token provided", data: null}))
    const decodedToken = jwt.verify(token, getEnvString("SECRET"))
    // const tokenExpirationTime = moment(decodedToken.exp * 1000).tz("Asia/Yangon").format()
    //Session Full 
    // if(timeNow > tokenExpirationTime) return res.status(401).json(errorResponse({statusCode: 401, message: "Session Full", data: null}))
    req.user= decodedToken
    if(process.env.NODE_ENV === "development"){
        console.log("req",decodedToken)
    }
    next()
}

export { generateToken, verifyToken }