import mongoose, { Document, Schema, Model } from 'mongoose'

//this is the example of accessories, merchantize, maintainence to create
interface CarPartTitleCategoriesModel extends Document {
    isDeleted: boolean,
    name: string,
    description: string,
    date: Date,
    createdAt: Date
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
    description: {
        type: String,
    },
   date: {
        type: Date
   },
   createdAt: {
    type: Date,
    default: Date.now
}
});



const CarPartTitleCategoriesModels: Model<CarPartTitleCategoriesModel> = mongoose.model<CarPartTitleCategoriesModel>('carpartTitlecategories', CarPartTitleCategorieschema);

export { CarPartTitleCategoriesModels, CarPartTitleCategoriesModel } ;