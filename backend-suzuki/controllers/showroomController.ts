import { Request, Response } from "express"
import { errorResponse } from "../helpers/responseHelper"
import showroomService from "../services/showroomService"
import mongoose from "mongoose"

export const listAllShowroom = async (req: Request, res: Response) => {
    const data = await showroomService.listAll() 
    res.status(data.statusCode).json(data)
}

export const readShowroom = async (req: Request, res: Response) => {
    const data = await showroomService.readById(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}

export const createShowroom = async (req: Request, res: Response) => {
    const data = await showroomService.create(req.file, req.body)
    res.status(data.statusCode).json(data)
}

export const updateShowroom = async (req: Request, res: Response) => {
    const data = await showroomService.updateById(req.file, new mongoose.Types.ObjectId(req.params.id), req.body)
    res.status(data.statusCode).json(data)
} 


 //this is to delete
 export const deleteShowroom = async (req: Request, res: Response) =>{
    const data = await showroomService.delete(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}