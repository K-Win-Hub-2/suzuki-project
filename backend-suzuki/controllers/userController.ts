import { Request, Response } from "express";
import { UserAccountServiceFactory } from "../services/userAccountService";
import { AdminUsers } from "../models/adminUserModel";
import mongoose from "mongoose";

const account = new UserAccountServiceFactory();

export const listAllUser = async (req: Request, res: Response) => {
  const { r } = req.query;
  const data = await account.accountType(r as string).listAll();
  // if(!req.user["isSuperAdmin"] && req.user["id"].toString() != req.params.id.toString()) return res.status(401).json(errorResponse({ statusCode:401, message: "You are not admin. So you can't read all user accounts", data: null}))
  res.status(data.statusCode).json(data);
};

export const createUser = async (req: Request, res: Response) => {
  const { r } = req.query;
  const data = await account
    .accountType(r as string)
    .create(req.file, req.body);
  console.log("create user", req.body);
  res.status(data.statusCode).json(data);
};

export const readUser = async (req: Request, res: Response) => {
  const { r } = req.query;
  const data = await account
    .accountType(r as string)
    .readById(new mongoose.Types.ObjectId(req.params.id));
  res.status(data.statusCode).json(data);
};

export const updateUser = async (req: Request, res: Response) => {
  const { r } = req.query;
  //if the user isn't super admin and user id from param is not equal to user id of login user
  if (!req.user.isSuperAdmin) req.body.isSuperAdmin = false;
  const data = await account
    .accountType(r as string)
    .updateById(req.file, new mongoose.Types.ObjectId(req.params.id), req.body);
  res.status(data.statusCode).json(data);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { r } = req.query;
  const data = await account
    .accountType(r as string)
    .delete(new mongoose.Types.ObjectId(req.params.id));
  res.status(data.statusCode).json(data);
};

export const listDealers = async (req: Request, res: Response) => {
  const { regionId, townShipId } = req.query;

  const FilterQuery: any = {
    isSuperAdmin: false,
    isDeleted: false,
  };

  if (regionId) {
    FilterQuery["region"] = regionId;
  }

  if (townShipId) {
    FilterQuery["townShip"] = townShipId;
  }

  const dealers = await AdminUsers.find(FilterQuery)
    .select("-password")
    .populate("region townShip");

  res.status(200).json({
    statusCode: 200,
    message: "These are all dealers",
    data: dealers,
  });
};

export const ListShippingMethod = async (req: Request, res: Response) => {
  const { dealerId } = req.query;

  const shippingMethod = await AdminUsers.find({
    _id: dealerId,
    isDeleted: false,
  }).select("shippingMethod");

  res.status(200).json({
    statusCode: 200,
    message: "These are all shipping methods",
    data: shippingMethod,
  });
};
