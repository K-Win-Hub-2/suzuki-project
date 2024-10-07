import mongoose, { Document, Model, Schema } from "mongoose";
import { OrderModels } from "./orderModel";
import { AdminUsers } from "./adminUserModel";
import Customers from "./customerModel";

interface Notification extends Document {
  title: string;
  message: string;
  order_id: mongoose.Schema.Types.ObjectId;
  dealer_id: mongoose.Schema.Types.ObjectId;
  isRead: boolean;
  customer_id: mongoose.Schema.Types.ObjectId;
}

const NotificationSchema: Schema<Notification> = new Schema({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: OrderModels,
  },
  dealer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: AdminUsers,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Customers,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const NotificationModels: Model<Notification> = mongoose.model(
  "Notifications",
  NotificationSchema
);

export { NotificationModels, Notification };
