import mongoose, { Document, Schema, Model } from 'mongoose'
import { Carmodels } from './carModel';
import { CarPartTitleCategoriesModels } from './carPartCategoriesModel';
import { CarPartTitleModels } from './carPartTitle';
import { AdminUsers } from './adminUserModel';

interface CarPartStockModel extends Document {
    isDeleted: boolean,
    name: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
    date: Date,
    colorCode: string,
    url: string,
    totalQuantity: number,
    dealerId: mongoose.Schema.Types.ObjectId
}

const CarPartStockSchema: Schema<CarPartStockModel> = new Schema({
    isDeleted: {
        type: Boolean,
        default: false,
    },
    name: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: CarPartTitleModels
    },
   colorCode: {
        type: String
   },
   url: {
        type: String
   },
   totalQuantity: {
        type: Number,
        default: 0
   },
   dealerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: AdminUsers
   },
   createdAt: {
        type: Date,
        default: Date.now
   },
   date: {
        type: Date,
   }
});



const CarPartStockModels: Model<CarPartStockModel> = mongoose.model<CarPartStockModel>('carpartstocks', CarPartStockSchema);

export { CarPartStockModels, CarPartStockModel } ;