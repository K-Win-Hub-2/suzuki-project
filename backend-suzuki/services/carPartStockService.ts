import mongoose, { FilterQuery } from "mongoose";
import { successResponse } from "../helpers/responseHelper";
import "dotenv/config";
import {
  CarPartStockModels,
  CarPartStockModel,
} from "../models/carPartStockModel";
import { CarPartTitleModels } from "../models/carPartTitle";
import { AdminUsers } from "../models/adminUserModel";
import path from "path";

class CarPartStockClass {
  constructor() {}

  async listAll(datas: FilterQuery<CarPartStockModel>) {
    let { dealerId, name } = datas;

    const query: FilterQuery<CarPartStockModel> = { isDeleted: false };
    dealerId ? (query.dealerId = dealerId) : "";

    //car part title
    name ? (query.name = name) : "";
    const data = await CarPartStockModels.find(query)
      .populate("name")
      .populate({
        path: "name",
        populate: {
          path: "car_model",
        },
      })
      .populate({
        path: "name",
        populate: {
          path: "car_part_category",
        },
      });

    return successResponse({
      statusCode: 200,
      message: "These are all Car Part Stock datas",
      data: data,
    });
  }

  async create(file: any, data: CarPartStockModel) {
    let results: CarPartStockModel[] = [];
    if (process.env.NODE_ENV === "development") {
      console.log("part stock", data, file);
    }
    if (file) {
      data.url = file.location;
    }
    //call dealer account
    const dealerAccount = await AdminUsers.find({
      isDeleted: false,
      isSuperAdmin: false,
    });
    if (dealerAccount.length > 0) {
      for (let i = 0; i < dealerAccount.length; i++) {
        data.dealerId = dealerAccount[i]._id as mongoose.Schema.Types.ObjectId;
        const carStock = await CarPartStockModels.create(data);
        results.push(carStock);
      }
    }
    return successResponse({
      statusCode: 200,
      message: "Car Part Stock Created successfully",
      data: results,
    });
  }

  async readById(id: mongoose.Types.ObjectId) {
    const result = await CarPartStockModels.findById(id);
    return successResponse({
      statusCode: 200,
      message: "This is Car Part Stock by id",
      data: result,
    });
  }

  async updateAll(
    file: any,
    partTitleId: mongoose.Types.ObjectId,
    partNumber: string,
    datas: CarPartStockModel
  ) {
    const result: Partial<CarPartStockModel>[] = [];
    if (file) {
      datas.url = file.location;
    }
    let query: FilterQuery<CarPartStockModel> = {
      isDeleted: false,
      partNumber: partNumber,
    };
    const findAllStock = await CarPartStockModels.find(query);
    if (findAllStock.length > 0) {
      for (let i = 0; i < findAllStock.length; i++) {
        const carStock: CarPartStockModel =
          (await CarPartStockModels.findByIdAndUpdate(
            findAllStock[i]._id,
            datas,
            { new: true }
          )) as CarPartStockModel;
        result.push(carStock);
      }
    }
    return successResponse({
      statusCode: 200,
      message: "Car Part Stock Updated By All successfully",
      data: result,
    });
  }

  async updateById(
    file: any,
    id: mongoose.Types.ObjectId,
    datas: CarPartStockModel
  ) {
    if (file) {
      datas.url = file.location;
    }
    const result = await CarPartStockModels.findByIdAndUpdate(id, datas, {
      new: true,
    });
    return successResponse({
      statusCode: 200,
      message: "Car Part Stock Updated successfully",
      data: result,
    });
  }

  async delete(id: mongoose.Types.ObjectId) {
    const result = await CarPartStockModels.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    return successResponse({
      statusCode: 200,
      message: "Car Part Stock deleted successfully",
      data: result,
    });
  }
}

export default new CarPartStockClass();
