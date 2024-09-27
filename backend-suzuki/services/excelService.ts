import xlsx from "xlsx"
import mongoose, { FilterQuery } from "mongoose"
import { successResponse } from "../helpers/responseHelper"
import "dotenv/config";
import { CarPartStockModels } from "../models/carPartStockModel";


//excel import
const excelImport = async (file: any) => {
        const workbook: xlsx.WorkBook = xlsx.readFile(file.path)
        console.log("w",workbook)
        const workSheet: xlsx.WorkSheet = workbook.Sheets[workbook.SheetNames[0]]
        const data: any [] = xlsx.utils.sheet_to_json(workSheet)
        console.log("this is excel data",data)
        for(let i= 0; i < data.length; i++){
            let updateData:any = {}
            updateData.totalQuantity = data[i].quantity
            updateData.originalPrice = data[i].originalPrice
            updateData.promotionPrice = data[i].promotionPrice
            const partNumber = data[i].partNumber.split(" (Suzuki)")[0]
            const result = await CarPartStockModels.updateMany({partNumber: partNumber},updateData)
        }
        return successResponse({statusCode: 200, message: "Excel Imported Successfully.", data: "Excel Data"})
}

export { excelImport }