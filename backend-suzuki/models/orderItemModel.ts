import mongoose, { Document, Schema, Model } from "mongoose";

enum OrderStatus {
  In_Progress = "In Progress",
  Confirmed = "Confirmed",
  Rejected = "Rejected",
}

interface OrderItem extends Document {
  isDeleted: boolean;
  partNumber: string;
  partName: string;
  price: number;
  quantity: number;
  status: OrderStatus;
  totalSalePrice: number;
  createdAt: Date;
  date: Date;
  remark: string;
  mainOrder: mongoose.Schema.Types.ObjectId;
  availableQuantity: number;
  confirmQuantity: number;
  qtyChangeStatus: Boolean;
  priceChangeStatus: Boolean;
  imgURL: string;
}

const OrderItemSchema: Schema<OrderItem> = new Schema({
  isDeleted: {
    type: Boolean,
    default: false,
  },
  partNumber: {
    type: String,
  },
  partName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.In_Progress,
  },
  totalSalePrice: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  remark: {
    type: String,
  },
  mainOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
  },
  availableQuantity: {
    type: Number,
  },
  confirmQuantity: {
    type: Number,
  },
  qtyChangeStatus: {
    type: Boolean,
    default: false,
  },
  priceChangeStatus: {
    type: Boolean,
    default: false,
  },
  imgURL: {
    type: String,
  },
});

const OrderItemModels: Model<OrderItem> = mongoose.model<OrderItem>(
  "ordersItems",
  OrderItemSchema
);

export { OrderItemModels, OrderItem };
