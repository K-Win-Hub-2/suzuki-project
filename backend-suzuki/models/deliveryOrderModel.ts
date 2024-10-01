import mongoose, { Document, Schema, Model } from "mongoose";

interface DeliveryOrder extends Document {
  isDeleted: boolean;
}

const DeliveryOrderSchema: Schema<DeliveryOrder> = new Schema({});

const DeliveryOrderModels: Model<DeliveryOrder> = mongoose.model<DeliveryOrder>(
  "deliveryorders",
  DeliveryOrderSchema
);

export { DeliveryOrderModels, DeliveryOrder };
