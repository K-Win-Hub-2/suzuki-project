import { Request, Response, NextFunction } from 'express'
import "dotenv/config";

export default function (func: any){
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((err: any)=> next(err))
    }
}