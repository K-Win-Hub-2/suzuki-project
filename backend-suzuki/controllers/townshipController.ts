import { Request, Response } from "express"
import { errorResponse } from "../helpers/responseHelper"
import townshipService from "../services/townshipService"
import mongoose from "mongoose"

export const listAllTownship = async (req: Request, res: Response) => {
    if(!req.user["isSuperAdmin"]) return res.status(401).json(errorResponse({ statusCode:401, message: "You are not admin. So you can't read business entity name", data: null}))
    const data = await townshipService.listAll() 
    res.status(data.statusCode).json(data)
}

export const readTownship = async (req: Request, res: Response) => {
    if(!req.user["isSuperAdmin"]) return res.status(401).json(errorResponse({ statusCode:401, message: "You can't read business entity data", data: null}))
    const data = await townshipService.readById(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}

export const createTownship = async (req: Request, res: Response) => {
    if(!req.user["isSuperAdmin"]) return res.status(401).json(errorResponse({ statusCode:401, message: "You can't create business entity name", data: null}))
    const data = await townshipService.create(req.body)
    res.status(data.statusCode).json(data)
}

export const updateTownship = async (req: Request, res: Response) => {
    //if the user isn't super admin 
    if(!req.user["isSuperAdmin"]) return res.status(401).json(errorResponse({ statusCode:401, message: "You can't edit business entity data", data: null}))
    const data = await townshipService.updateById(new mongoose.Types.ObjectId(req.params.id), req.body)
    res.status(data.statusCode).json(data)
} 

 //this is to delete
 export const deleteTownship = async (req: Request, res: Response) =>{
    if(!req.user["isSuperAdmin"]) return res.status(401).json(errorResponse({ statusCode:401, message: "You can't delete business entity data", data: null}))
    const data = await townshipService.delete(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}