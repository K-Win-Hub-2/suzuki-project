import mongoose, { Document, Schema, Model } from 'mongoose'
import bcryptHelpers from '../helpers/bcryptHelper';

interface Carmodel extends Document {
    isDeleted: boolean,
    name: string,
    date: Date,
    url: string,
    model_number: string
}

const CarModelSchema: Schema<Carmodel> = new Schema({
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
   },
   url: {
    type: String,
   },
   model_number: {
        type: String
   }
});



const Carmodels: Model<Carmodel> = mongoose.model<Carmodel>('carmodels', CarModelSchema);

export { Carmodels, Carmodel } ;