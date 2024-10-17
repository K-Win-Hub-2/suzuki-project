import mongoose, { Document, Schema, Model } from "mongoose";

enum RegionEnum {
  Mandalay = "Mandalay",
  Ayeyarwady = "Ayeyarwady",
  Bago = "Bago",
  Magway = "Magway",
  Sagaing = "Sagaing",
  Tanintharyi = "Tanintharyi",
  Yangon = "Yangon",
  Chin = "Chin",
  Kachin = "Kachin",
  Kayah = "Kayah",
  Kayin = "Kayin",
  Mon = "Mon",
  Rakhine = "Rakhine",
  Shan = "Shan",
  NayPyiTaw = "NayPyiTaw",
}

interface Region extends Document {
  region: String;
  isDeleted: Boolean;
  townShip: String;
  dealerId: mongoose.Schema.Types.ObjectId[];
}

const RegionSchema: Schema<Region> = new Schema({
  region: {
    type: String,
    enum: Object.values(RegionEnum),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  townShip: {
    type: String,
  },
  dealerId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminusers",
    },
  ],
});

const RegionsModels: Model<Region> = mongoose.model("Regions", RegionSchema);

export { RegionsModels, Region };
