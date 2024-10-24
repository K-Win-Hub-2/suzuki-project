import mongoose, { Document, Schema, Model } from "mongoose";
import bcryptHelpers from "../helpers/bcryptHelper";
import { Showrooms } from "./showroomModel";
import { TownShipModels } from "./newTownShipModel";
import { RegionsModels } from "./regionModel";
import { RoleCategories } from "./roleCategoriesModel";

interface AdminUser extends Document {
  data: mongoose.Types.ObjectId;
  isSuperAdmin: boolean;
  // businessEntityName: mongoose.Types.ObjectId;
  code: string;
  isDeleted: boolean;
  showroom: mongoose.Schema.Types.ObjectId;
  name: string;
  // email?: string;
  password: string;
  phone: string;
  address: string;
  townShip?: mongoose.Schema.Types.ObjectId;
  region?: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  isBanned: boolean;
  bannedReason?: string;
  //showroom infos
  url: string;
  date: Date;
  openDays: string;
  openHours: string;
  latitude: string;
  longitude: string;
  description: string;
  role: string;
  authorizedRole?: mongoose.Schema.Types.ObjectId;
  shippingMethod: string[];
  labels: string[];
}

const AdminUserSchema: Schema = new Schema({
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  showroom: {
    type: mongoose.Types.ObjectId,
    ref: Showrooms,
  },
  code: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  // email: {
  //   type: String,
  // },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  townShip: {
    type: mongoose.Types.ObjectId,
    ref: TownShipModels,
  },
  region: {
    type: mongoose.Types.ObjectId,
    ref: RegionsModels,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  bannedReason: {
    type: String,
  },
  //showroom info
  url: {
    type: String,
  },
  date: {
    type: Date,
  },
  openDays: {
    type: String,
  },
  openHours: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  description: {
    type: String,
  },
  role: {
    type: String,
  },
  shippingMethod: {
    type: [String],
  },
  authorizedRole: {
    type: mongoose.Types.ObjectId,
    ref: RoleCategories,
  },
  labels: {
    type: [String],
  },
});

AdminUserSchema.pre<AdminUser>("save", async function (next) {
  // const emailValidation = this.email
  //   ? bcryptHelpers.validateEmail(this.email)
  //   : false;
  const passwordValidation = bcryptHelpers.validatePassword(this.password);

  // if (!emailValidation) {
  //   return next(new Error("Email should contain @"));
  // }

  if (!passwordValidation) {
    return next(
      new Error("Password should contain at least one character and one number")
    );
  }

  const password = this.password;
  this.password = await bcryptHelpers.encrypt(password);

  next();
});

AdminUserSchema.pre("findOneAndUpdate", async function (next) {
  const query = this as mongoose.Query<any, AdminUser>;
  const update = query.getUpdate() as Partial<AdminUser>;
  if (update.password) {
    update.password = await bcryptHelpers.encrypt(update.password);
    query.setUpdate(update);
  }
  next();
});

const AdminUsers: Model<AdminUser> = mongoose.model<AdminUser>(
  "AdminUsers",
  AdminUserSchema
);

export { AdminUsers, AdminUser };
