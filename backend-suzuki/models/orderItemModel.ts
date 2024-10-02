import mongoose, { Document, Schema, Model } from "mongoose";

interface OrderItem extends Document {
  isDeleted: boolean;
  partNumber: string;
  partName: string;
  price: number;
  quantity: number;
  status: string;
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
  },
  priceChangeStatus: {
    type: Boolean,
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
