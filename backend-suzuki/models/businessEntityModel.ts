import mongoose, { Schema, Model, Document } from "mongoose";

export interface BusinessEntityInterface extends Document {
    isDeleted: boolean;
    name: string;
}

const businessSchema: Schema = new Schema({
    isDeleted: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
});

const BusinessEntity: Model<BusinessEntityInterface> = mongoose.model<BusinessEntityInterface>("BusinessEntity", businessSchema);

export default BusinessEntity;