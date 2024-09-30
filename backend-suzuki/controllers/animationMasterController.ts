import { Request, Response } from "express"
import AnimationMaster from "../services/animationMasterService"
import mongoose from "mongoose"
import catchError from "../lib/catchError"

export const listAllAnimationMaster = async (req: Request, res: Response) => {
    const data = await AnimationMaster.listAll(req.query) 
    res.status(data.statusCode).json(data)
}

export const readAnimationMaster = async (req: Request, res: Response) => {
    const data = await AnimationMaster.readById(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}

export const createAnimationMaster = async (req: Request, res: Response) => {
    const data = await AnimationMaster.create(req.files, req.body)
    res.status(data.statusCode).json(data)
}

export const updateAnimationMaster = async (req: Request, res: Response) => {
    const data = await AnimationMaster.updateById(req.file, new mongoose.Types.ObjectId(req.params.id), req.body)
    res.status(data.statusCode).json(data)
} 

 //this is to delete
 export const deleteAnimationMaster = async (req: Request, res: Response) =>{
    const data = await AnimationMaster.delete(new mongoose.Types.ObjectId(req.params.id))
    res.status(data.statusCode).json(data)
}