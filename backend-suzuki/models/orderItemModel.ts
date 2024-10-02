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
  carModel: mongoose.Schema.Types.ObjectId;
  partOriginalPrice: number;
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
  partImgURL: string;
  partDescription: string;
  partDiscountPrice: number;
  colorName: string;
  colorImgURL: string;
  color: string;
  colorOriginalPrice: number;
  colorDiscountPercent: number;
  colorDiscountPrice: number;
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
  carModel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carmodels",
  },
  partOriginalPrice: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.In_Progress,
  },
  totalSalePrice: {
    type: Number,
    default: 0,
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
    default: 0,
  },
  confirmQuantity: {
    type: Number,
    default: 0,
  },
  qtyChangeStatus: {
    type: Boolean,
    default: false,
  },
  priceChangeStatus: {
    type: Boolean,
    default: false,
  },
  partImgURL: {
    type: String,
  },
  partDescription: {
    type: String,
  },
  partDiscountPrice: {
    type: Number,
    default: 0,
  },
  colorName: {
    type: String,
  },
  colorImgURL: {
    type: String,
  },
  color: {
    type: String,
  },
  colorOriginalPrice: {
    type: Number,
    default: 0,
  },
  colorDiscountPercent: {
    type: Number,
    default: 0,
  },
  colorDiscountPrice: {
    type: Number,
    default: 0,
  },
});

const OrderItemModels: Model<OrderItem> = mongoose.model<OrderItem>(
  "ordersItems",
  OrderItemSchema
);

export { OrderItemModels, OrderItem };
