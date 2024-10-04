import { Request, Response } from "express";
import { excelImport } from "../services/excelService";

export const createWithExcel = async (req: Request, res: Response) => {
  const data = await excelImport(req.file);
  res.status(data.statusCode).json(data);
};
