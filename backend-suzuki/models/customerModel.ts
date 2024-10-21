import mongoose, { Document, Schema, Model } from "mongoose";
import bcryptHelpers from "../helpers/bcryptHelper";

interface Customer extends Document {
  isDeleted: boolean;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  date: Date;
  gender: String;
  isBanned: boolean;
  bannedReason?: string;
}

const CustomerSchema: Schema<Customer> = new Schema({
  isDeleted: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
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
});

CustomerSchema.pre<Customer>("save", async function (next) {
  const emailValidation = bcryptHelpers.validateEmail(this.email);
  const passwordValidation = bcryptHelpers.validatePassword(this.password);

  if (!emailValidation) {
    return next(new Error("Email should contain @"));
  }

  if (!passwordValidation) {
    return next(
      new Error("Password should contain at least one character and one number")
    );
  }

  const password = this.password;
  this.password = await bcryptHelpers.encrypt(password);

  next();
});

CustomerSchema.pre("findOneAndUpdate", async function (next) {
  const query = this as mongoose.Query<any, Customer>;
  const update = query.getUpdate() as Partial<Customer>;
  if (update.password) {
    update.password = await bcryptHelpers.encrypt(update.password);
    query.setUpdate(update);
  }
  next();
});

const Customers: Model<Customer> = mongoose.model<Customer>(
  "customers",
  CustomerSchema
);

export default Customers;
