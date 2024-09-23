import mongoose, { Document, Schema, Model } from 'mongoose'

interface CarPartTitleCategoriesModel extends Document {
    isDeleted: boolean,
    name: string,
    date: Date
}

const CarPartTitleCategorieschema: Schema<CarPartTitleCategoriesModel> = new Schema({
    isDeleted: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
   date: {
        type: Date,
        default: Date.now
   }
});



const CarPartTitleCategoriesModels: Model<CarPartTitleCategoriesModel> = mongoose.model<CarPartTitleCategoriesModel>('carpartTitlecategories', CarPartTitleCategorieschema);

export { CarPartTitleCategoriesModels, CarPartTitleCategoriesModel } ;