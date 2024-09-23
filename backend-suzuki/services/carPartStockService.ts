import mongoose, { FilterQuery } from "mongoose"
import { successResponse } from "../helpers/responseHelper"
import "dotenv/config";
import { CarPartStockModels, CarPartStockModel } from "../models/carPartStockModel";

class CarPartStockClass {
    constructor() {}
    async listAll(datas: FilterQuery<CarPartStockModel>){
        let { dealerId, name } = datas
        const query: FilterQuery<CarPartStockModel> = { isDeleted: false }
        dealerId ? query.dealerId = dealerId : ""
        //car part title
        name ? query.name = name : ""
        const data = await CarPartStockModels.find(query)
        return successResponse({statusCode: 200, message: "These are all Car Part Stock datas", data: data})
    }
    async create(file: any,data: CarPartStockModel){
        if(process.env.NODE_ENV === "development") {
            console.log("part stock", data, file)
        }
        if(file){
            data.url = file.location
         }
         const result = await CarPartStockModels.create(data)
         return successResponse({ statusCode:200, message: "Car Part Stock Created successfully", data: result})
    }
    async readById(id: mongoose.Types.ObjectId){
          const result = await CarPartStockModels.findById(id)
          return successResponse({ statusCode:200, message: "This is Car Part Stock by id", data: result})  
    }
    async updateById(file: any, id: mongoose.Types.ObjectId, datas: CarPartStockModel){
        if(file){
            datas.url = file.location
         }
         const result = await CarPartStockModels.findByIdAndUpdate(id, datas, { new: true })
         return successResponse({ statusCode:200, message: "Car Part Stock Updated successfully", data: result})
    }
    async delete(id: mongoose.Types.ObjectId){
            const result = await CarPartStockModels.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
            return successResponse({ statusCode:200, message: "Car Part Stock deleted successfully", data: result})
    }
}

export default new CarPartStockClass() 