import mongoose from "mongoose"
import { successResponse } from "../helpers/responseHelper"
import { Showrooms, Showroom } from "../models/showroomModel"
import "dotenv/config";

class ShowroomServiceClass {
    constructor() {}
    async listAll(){
        const query = { isDeleted: false }
        const data = await Showrooms.find(query)
        return successResponse({statusCode: 200, message: "These are all Showroom datas", data: data})
    }
    async create(file: any,data: Showroom){
        if(process.env.NODE_ENV === "development") {
            console.log("showroomdata", data, file)
        }
         if(file){
            data.url = file.location
         }
         const result = await Showrooms.create(data)
         return successResponse({ statusCode:200, message: "Showroom Created successfully", data: result})
    }
    async readById(id: mongoose.Types.ObjectId){
          const result = await Showrooms.findById(id)
          return successResponse({ statusCode:200, message: "This is Showroom by id", data: result})  
    }
    async updateById(file: any, id: mongoose.Types.ObjectId, datas: Showroom){
        if(file){
            datas.url = file.location
         }
         const result = await Showrooms.findByIdAndUpdate(id, datas, { new: true })
         return successResponse({ statusCode:200, message: "Showroom Updated successfully", data: result})
    }
    async delete(id: mongoose.Types.ObjectId){
            const result = await Showrooms.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
            return successResponse({ statusCode:200, message: "Showroom deleted successfully", data: result})
    }
}

export default new ShowroomServiceClass() 