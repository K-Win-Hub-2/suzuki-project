import { Request, Response } from "express"
import CarPartModelService from "../services/carPartCategories"
import mongoose from "mongoose"

export const listAllCarPartCategories = async (req: Request, res: Response) => {
    const data = await CarPartModelService.listAll() 
    res.status(data.statusCode).json(data)
}

export const readCarPartCategoriesModel = async (req: Request, res: Response) => {
    const data = await CarPartModelService.readById(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}

export const createCarPartCategoriesModel = async (req: Request, res: Response) => {
    const data = await CarPartModelService.create(req.file, req.body)
    res.status(data.statusCode).json(data)
}

export const updateCarPartCategoriesModel = async (req: Request, res: Response) => {
    const data = await CarPartModelService.updateById(req.file, new mongoose.Types.ObjectId(req.params.id), req.body)
    res.status(data.statusCode).json(data)
} 

 //this is to delete
 export const deleteCarPartCategoriesModel = async (req: Request, res: Response) =>{
    const data = await CarPartModelService.delete(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}