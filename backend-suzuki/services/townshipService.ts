import mongoose from "mongoose"
import { errorResponse, successResponse } from "../helpers/responseHelper"
import TownShip from "../models/townshipModel"


class TownShipServiceClass {
    async listAll(){
      try{
        const data = await TownShip.find()
        return successResponse({statusCode: 200, message: "These are all township datas", data: data})
      }catch(err: any){
        return errorResponse({ statusCode:200, message: err.message, data: null})
      }
    }
    async create(data: { name: string, state: string }){
       try{
         const { name, state } = data
         const result = await TownShip.create({ name: name, state: state })
         return successResponse({ statusCode:200, message: "Township Created successfully", data: result})
       }catch(err: any){
          return errorResponse({ statusCode:200, message: err.message, data: null})
       }
        
    }
    async readById(id: mongoose.Types.ObjectId){
        try{
          const result = await TownShip.findById(id)
          return successResponse({ statusCode:200, message: "This is township by id", data: result})  
        }
        catch(err: any){
            return errorResponse({ statusCode:200, message: err.message, data: null})
        }
    }
    async updateById(id: mongoose.Types.ObjectId, datas: { name: string, state: string}){
        try{
         const { name, state } = datas
         const updateData: { name?: string, state?: string } = {}
         if(name) updateData.name = name
         if(state) updateData.state = state
         const result = await TownShip.findByIdAndUpdate(id, updateData)
         return successResponse({ statusCode:200, message: "Township Updated successfully", data: result})
        }catch(err: any){
            return errorResponse({ statusCode:200, message: err.message, data: null})
         }
    }
    async delete(id: mongoose.Types.ObjectId){
        try{
            const result = await TownShip.findByIdAndUpdate(id, { isDeleted: true })
            return successResponse({ statusCode:200, message: "Township deleted successfully", data: result})
        }catch(err: any){
            return errorResponse({ statusCode:200, message: err.message, data: null})
        }
    }
}

export default new TownShipServiceClass() 