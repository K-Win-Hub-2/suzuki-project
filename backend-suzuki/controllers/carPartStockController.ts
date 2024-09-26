import { Request, Response } from "express"
import CarPartStock from "../services/carPartStockService"
import mongoose from "mongoose"

export const listAllCarPartStock = async (req: Request, res: Response) => {
    const data = await CarPartStock.listAll(req.query) 
    res.status(data.statusCode).json(data)
}

export const readCarPartStock = async (req: Request, res: Response) => {
    const data = await CarPartStock.readById(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}

export const createCarPartStock = async (req: Request, res: Response) => {
    const data = await CarPartStock.create(req.file, req.body)
    res.status(data.statusCode).json(data)
}

export const updateCarPartStock = async (req: Request, res: Response) => {
    const data = await CarPartStock.updateById(req.file, new mongoose.Types.ObjectId(req.params.id), req.body)
    res.status(data.statusCode).json(data)
} 

export const updateCarPartStockByAll = async (req: Request, res: Response) => {
    const data = await CarPartStock.updateAll(req.file, new mongoose.Types.ObjectId(req.body.name), req.body.partNumber, req.body)
    res.status(data.statusCode).json(data)
} 

 //this is to delete
 export const deleteCarPartStock = async (req: Request, res: Response) =>{
    const data = await CarPartStock.delete(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}