import { Request, Response } from "express"
import CarPartTitle from "../services/carPartTitleService"
import mongoose from "mongoose"

export const listAllCarPartTitle = async (req: Request, res: Response) => {
    const data = await CarPartTitle.listAll(req.query) 
    res.status(data.statusCode).json(data)
}

export const readCarPartTitle = async (req: Request, res: Response) => {
    const data = await CarPartTitle.readById(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}

export const createCarPartTitle = async (req: Request, res: Response) => {
    const data = await CarPartTitle.create(req.file, req.body)
    res.status(data.statusCode).json(data)
}

export const updateCarPartTitle = async (req: Request, res: Response) => {
    const data = await CarPartTitle.updateById(req.file, new mongoose.Types.ObjectId(req.params.id), req.body)
    res.status(data.statusCode).json(data)
} 

 //this is to delete
 export const deleteCarPartTitle = async (req: Request, res: Response) =>{
    const data = await CarPartTitle.delete(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}