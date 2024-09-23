import mongoose from "mongoose"
import { successResponse } from "../helpers/responseHelper"
import { Carmodel, Carmodels } from "../models/carModel"
import "dotenv/config";

class CarModelServiceClass {
    constructor() {}
    async listAll(){
        const query = { isDeleted: false }
        const data = await Carmodels.find(query)
        return successResponse({statusCode: 200, message: "These are all Car Model datas", data: data})
    }
    async create(file: any,data: Carmodel){
        if(process.env.NODE_ENV === "development") {
            console.log("showroomdata", data, file)
        }
         if(file){
            data.url = file.location
         }
         const result = await Carmodels.create(data)
         return successResponse({ statusCode:200, message: "Car Model Created successfully", data: result})
    }
    async readById(id: mongoose.Types.ObjectId){
          const result = await Carmodels.findById(id)
          return successResponse({ statusCode:200, message: "This is Car Model by id", data: result})  
    }
    async updateById(file: any, id: mongoose.Types.ObjectId, datas: Carmodel){
        if(file){
            datas.url = file.location
         }
         const result = await Carmodels.findByIdAndUpdate(id, datas, { new: true })
         return successResponse({ statusCode:200, message: "Car Model Updated successfully", data: result})
    }
    async delete(id: mongoose.Types.ObjectId){
            const result = await Carmodels.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
            return successResponse({ statusCode:200, message: "Car Model deleted successfully", data: result})
    }
}

export default new CarModelServiceClass() 