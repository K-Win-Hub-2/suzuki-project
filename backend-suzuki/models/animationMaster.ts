import mongoose, { Model } from "mongoose";
import { Schema, Document } from "mongoose";

interface AnimationMaster extends Document {
  isDeleted: boolean;
  title: string;
  type: string;
  role: string;
  showType: string;
  description: string;
  createdAt: Date;
  url: string;
}

const AnimationMasterSchema: Schema = new Schema({
  isDeleted: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  type: {
    type: String,
    enum: ["login", "signup", "intro", "homepage", "slideshow"],
    default: "intro",
  },
  role: {
    type: String,
    enum: ["admin", "dealer"],
    default: "admin",
  },
  showType: {
    type: String,
    enum: ["mobile", "tablet", "website"],
    default: "website",
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
  },
});

const AnimationMasterModel: Model<AnimationMaster> =
  mongoose.model<AnimationMaster>("AnimationMasters", AnimationMasterSchema);

export { AnimationMaster, AnimationMasterModel };
