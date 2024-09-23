import { Request, Response } from "express"
import AuthFactory  from "../services/authService"

export const login = async (req: Request, res: Response) => {
    const { r } = req.query
    const data = await AuthFactory.authType(r as string)?.login(req.body)
    res.status(data.statusCode).json(data)
}