import mongoose, { Document, Schema, Model } from 'mongoose'
import { Carmodels } from './carModel';
import { CarPartTitleCategoriesModels } from './carPartCategoriesModel';

interface CarPartTitleModel extends Document {
    isDeleted: boolean,
    name: string,
    date: Date,
    originalPrice: number,
    discountPrice: number,
    url: string,
    promotionPrice: number,
    car_model: mongoose.Schema.Types.ObjectId,
    car_part_category: mongoose.Schema.Types.ObjectId
}

const CarPartTitleSchema: Schema<CarPartTitleModel> = new Schema({
    isDeleted: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String
    },
   date: {
        type: Date,
        default: Date.now
   },
   originalPrice: {
    type: Number
 },
 discountPrice: {
    type: Number
 },
 promotionPrice: {
    type: Number
 },
   //this is accessory, or mechandize or maintainence
   car_part_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref : CarPartTitleCategoriesModels
   },
   car_model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Carmodels
   }
});



const CarPartTitleModels: Model<CarPartTitleModel> = mongoose.model<CarPartTitleModel>('carparttitles', CarPartTitleSchema);

export { CarPartTitleModels, CarPartTitleModel } ;