import mongoose, { FilterQuery } from "mongoose"
import { successResponse } from "../helpers/responseHelper"
import "dotenv/config";
import { CarPartTitleModels, CarPartTitleModel } from "../models/carPartTitle";

class CarPartTitleClass {
    constructor() {}
    async listAll(datas: FilterQuery<CarPartTitleModel>){
        let { car_part_category, car_model } = datas
        const query: FilterQuery<CarPartTitleModel> = { isDeleted: false }
        car_part_category ? query.car_part_category = car_part_category : ""
        car_model ? query.car_model = car_model : ""
        const data = await CarPartTitleModels.find(query)
        return successResponse({statusCode: 200, message: "These are all Car Part Title datas", data: data})
    }
    async create(file: any,data: CarPartTitleModel){
        if(process.env.NODE_ENV === "development") {
            console.log("title", data, file)
        }
         if(file){
            data.url = file.location
         }
         const result = await CarPartTitleModels.create(data)
         return successResponse({ statusCode:200, message: "Car Part Title Created successfully", data: result})
    }
    async readById(id: mongoose.Types.ObjectId){
          const result = await CarPartTitleModels.findById(id)
          return successResponse({ statusCode:200, message: "This is Car Part Title by id", data: result})  
    }
    async updateById(file: any, id: mongoose.Types.ObjectId, datas: CarPartTitleModel){
        if(file){
            datas.url = file.location
         }
         const result = await CarPartTitleModels.findByIdAndUpdate(id, datas, { new: true })
         return successResponse({ statusCode:200, message: "Car Part Title Updated successfully", data: result})
    }
    async delete(id: mongoose.Types.ObjectId){
            const result = await CarPartTitleModels.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
            return successResponse({ statusCode:200, message: "Car Part Title deleted successfully", data: result})
    }
}

export default new CarPartTitleClass() 