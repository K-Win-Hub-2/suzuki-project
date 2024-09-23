import mongoose, { Model, Document, Schema } from "mongoose";
import constantData from "../constants/constant";

export interface TownshipInterface extends Document {
    isDeleted: boolean;
    name: string;
    state: string;
}

const TownShipSchema: Schema = new Schema({
    isDeleted: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: constantData.townShipName,
        default: "Yangon",
    },
});

const TownShip: Model<TownshipInterface> = mongoose.model<TownshipInterface>("TownShip", TownShipSchema);

export default TownShip;