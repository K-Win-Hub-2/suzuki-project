import mongoose, { Document, Schema, Model } from "mongoose";

interface TownShip extends Document {
  townShip: String;
  isDeleted: Boolean;
  dealerId: mongoose.Schema.Types.ObjectId[];
}

const TownShipSchema: Schema<TownShip> = new Schema({
  townShip: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  dealerId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUsers",
    },
  ],
});

const TownShipModels: Model<TownShip> = mongoose.model(
  "TownShips",
  TownShipSchema
);

export { TownShipModels, TownShip };
