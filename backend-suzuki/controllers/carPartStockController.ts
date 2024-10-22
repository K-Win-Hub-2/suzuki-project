import { Request, Response } from "express";
import CarPartStock from "../services/carPartStockService";
import mongoose from "mongoose";
import {
  checkStockByDealerAndItems,
  FilterStockByTownShipAndRegion,
  checkStockAvailability,
} from "../helpers/stockCheckHelper";

export const listAllCarPartStock = async (req: Request, res: Response) => {
  const data = await CarPartStock.listAll(req.query);
  res.status(data.statusCode).json(data);
};

export const readCarPartStock = async (req: Request, res: Response) => {
  const data = await CarPartStock.readById(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};

export const createCarPartStock = async (req: Request, res: Response) => {
  const data = await CarPartStock.create(req.file, req.body);
  res.status(data.statusCode).json(data);
};

export const updateCarPartStock = async (req: Request, res: Response) => {
  const data = await CarPartStock.updateById(
    req.file,
    new mongoose.Types.ObjectId(req.params.id),
    req.body
  );
  res.status(data.statusCode).json(data);
};

export const updateCarPartStockByAll = async (req: Request, res: Response) => {
  const data = await CarPartStock.updateAll(
    req.file,
    new mongoose.Types.ObjectId(req.body.name),
    req.params.id,
    req.body
  );
  res.status(data.statusCode).json(data);
};

//this is to delete
export const deleteCarPartStock = async (req: Request, res: Response) => {
  const data = await CarPartStock.delete(
    new mongoose.Types.ObjectId(req.params.id)
  );
  res.status(data.statusCode).json(data);
};

export const CheckAllStocksByDelear = async (req: Request, res: Response) => {
  const data = await checkStockByDealerAndItems(
    req.body.dealerId,
    req.body.stockItems
  );
  res.status(200).json(data);
};

export const CheckAllStocksByTownShipAndRegion = async (
  req: Request,
  res: Response
) => {
  const { townShipId, regionId, carPartName } = req.query;

  const data = await FilterStockByTownShipAndRegion(
    townShipId ? new mongoose.Types.ObjectId(townShipId as string) : null,
    regionId ? new mongoose.Types.ObjectId(regionId as string) : null,
    new mongoose.Types.ObjectId(carPartName as string)
  );

  res.status(200).json(data);
};

export const checkStockAvailabilityController = async (
  req: Request,
  res: Response
) => {
  const { dealerId, stockItems } = req.body;
  const data = await checkStockAvailability(dealerId, stockItems);

  res.status(200).json(data);
};
