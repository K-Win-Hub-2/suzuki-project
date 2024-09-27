import mongoose, { FilterQuery } from "mongoose"
import { successResponse } from "../helpers/responseHelper"
import "dotenv/config";
import  { AnimationMaster, AnimationMasterModel } from "../models/animationMaster"

class AnimationMasterClass {
    constructor() {}
    async listAll(datas: FilterQuery<AnimationMaster>){
        let { type, sort, role } = datas
        let sorted: any = { id: 1 }
        const query: FilterQuery<AnimationMaster> = { isDeleted: false }
        type ? query.type = type.toLowerCase() : ""
        role ? query.role = role.toLowerCase() : ""
        sort ? sorted = { id: -1 } : ""
        const data = await AnimationMasterModel.find(query).sort(sorted)
        return successResponse({statusCode: 200, message: "These are all Animation datas", data: data})
    }
    async create(files: any,data: AnimationMaster){
        let result: AnimationMaster[] = []
        if(process.env.NODE_ENV === "development") {
            console.log("Animation Master", data, files)
        }
         if(files.length > 0){
            files.forEach(async(file: any) => {
                data.type = data.type.toLowerCase()
                data.url = file.location
                const animation = await AnimationMasterModel.create(data)
                result.push(animation)
            })
            
         }
         return successResponse({ statusCode:200, message: "Animation Data Created successfully", data: result})
    }
    async readById(id: mongoose.Types.ObjectId){
          const result = await AnimationMasterModel.findById(id)
          return successResponse({ statusCode:200, message: "This is Animation Data by id", data: result})  
    }
    async updateById(file: any, id: mongoose.Types.ObjectId, datas: AnimationMaster){
        if(file){
            datas.url = file.location
         }
         const result = await AnimationMasterModel.findByIdAndUpdate(id, datas, { new: true })
         return successResponse({ statusCode:200, message: "Animation Data Updated successfully", data: result})
    }
    async delete(id: mongoose.Types.ObjectId){
            const result = await AnimationMasterModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
            return successResponse({ statusCode:200, message: "Animation Data deleted successfully", data: result})
    }
}

export default new AnimationMasterClass() 