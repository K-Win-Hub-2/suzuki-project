import mongoose, { Document, Schema, Model } from "mongoose";
import { Carmodels } from "./carModel";
import { CarPartTitleCategoriesModels } from "./carPartCategoriesModel";
import { CarPartTitleModels } from "./carPartTitle";
import { AdminUsers } from "./adminUserModel";
//related with car part title
interface CarPartStockModel extends Document {
  isDeleted: boolean;
  //car part title
  name: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  partNumber: string;
  colorName: string;
  partName: string;
  date: Date;
  colorCode: string;
  url: string;
  totalQuantity: number;
  originalPrice: number;
  discountPrice: number;
  promotionPrice: number;
  dealerId: mongoose.Schema.Types.ObjectId;
}

const CarPartStockSchema: Schema<CarPartStockModel> = new Schema({
  isDeleted: {
    type: Boolean,
    default: false,
  },
  partNumber: {
    type: String,
  },
  partName: {
    type: String,
  },
  colorName: {
    type: String,
  },
  name: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: CarPartTitleModels,
  },
  colorCode: {
    type: String,
  },
  url: {
    type: String,
  },
  totalQuantity: {
    type: Number,
    default: 0,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  promotionPrice: {
    type: Number,
    default: 0,
  },
  dealerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: AdminUsers,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
  },
});

const CarPartStockModels: Model<CarPartStockModel> =
  mongoose.model<CarPartStockModel>("carpartstocks", CarPartStockSchema);

export { CarPartStockModels, CarPartStockModel };
