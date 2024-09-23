import { Request, Response } from "express"
import CarModelService from "../services/carModelService"
import mongoose from "mongoose"

export const listAllCarModel = async (req: Request, res: Response) => {
    const data = await CarModelService.listAll() 
    res.status(data.statusCode).json(data)
}

export const readCarModel = async (req: Request, res: Response) => {
    const data = await CarModelService.readById(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}

export const createCarModel = async (req: Request, res: Response) => {
    const data = await CarModelService.create(req.file, req.body)
    res.status(data.statusCode).json(data)
}

export const updateCarModel = async (req: Request, res: Response) => {
    const data = await CarModelService.updateById(req.file, new mongoose.Types.ObjectId(req.params.id), req.body)
    res.status(data.statusCode).json(data)
} 

 //this is to delete
 export const deleteCarModel = async (req: Request, res: Response) =>{
    const data = await CarModelService.delete(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}