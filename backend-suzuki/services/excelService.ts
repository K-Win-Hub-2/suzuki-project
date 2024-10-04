import xlsx from "xlsx";
import mongoose, { FilterQuery } from "mongoose";
import { successResponse } from "../helpers/responseHelper";
import "dotenv/config";
import { CarPartStockModels } from "../models/carPartStockModel";
import { AdminUsers } from "../models/adminUserModel";

//excel import
const excelImport = async (file: any) => {
  const workbook: xlsx.WorkBook = xlsx.readFile(file.path);
  const workSheet: xlsx.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
  const data: any[] = xlsx.utils.sheet_to_json(workSheet);

  for (let i = 0; i < data.length; i++) {
    let updateData: any = {};
    let dealerResult;
    updateData.totalQuantity = data[i].quantity;
    updateData.originalPrice = data[i].originalPrice;
    updateData.discountPrice = data[i].discountPrice;
    updateData.promotionPrice = data[i].promotionPrice;
    let dealerCode: string = data[i].dealerCode;

    if (dealerCode) {
      const dealerCodes: string = dealerCode.split(" (Suzuki)")[0];
      dealerResult = await AdminUsers.findOne({ code: dealerCodes });
    }

    const partNumber = data[i].partNumber.split(" (Suzuki)")[0];
    let query: Partial<{
      isDeleted: boolean;
      partNumber: string;
      dealerId: mongoose.Types.ObjectId;
    }> = { isDeleted: false };

    partNumber ? (query.partNumber = partNumber) : "";

    dealerResult
      ? (query.dealerId = new mongoose.Types.ObjectId(
          dealerResult._id as mongoose.Types.ObjectId
        ))
      : "";
    const result = await CarPartStockModels.updateMany(query, updateData);
  }
  return successResponse({
    statusCode: 200,
    message: "Excel Imported Successfully.",
    data: "Excel Data",
  });
};

export { excelImport };
