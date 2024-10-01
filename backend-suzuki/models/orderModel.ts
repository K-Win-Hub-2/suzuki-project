import mongoose, { Document, Schema, Model } from "mongoose";

enum OrderStatus {
  In_Progress = "In Progress",
  Confirmed = "Confirmed",
  Rejected = "Rejected",
}

interface OrderItemDocRef {
  item_id: mongoose.Schema.Types.ObjectId;
  partNumber: string;
  partName: string;
  price: number;
  quantity: number;
  qtyChangeStatus: string;
  priceChangeStatus: string;
}

interface Order extends Document {
  isDeleted: boolean;
  orderDate: Date;
  orderNumber: number;
  customer: mongoose.Schema.Types.ObjectId;
  dealer: mongoose.Schema.Types.ObjectId;
  totalSaleAmount: number;
  totalItem: number;
  status: OrderStatus;
  deliverOrder: mongoose.Schema.Types.ObjectId;
  smallOrder: OrderItemDocRef[];
}

const OrderSchema: Schema<Order> = new Schema({
  isDeleted: {
    type: Boolean,
    default: false,
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  orderNumber: {
    type: Number,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
    required: true,
  },
  dealer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dealers",
    required: true,
  },
  totalSaleAmount: {
    type: Number,
  },
  totalItem: {
    type: Number,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.In_Progress,
  },
  deliverOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "deliveryorders",
  },
  smallOrder: [
    {
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems",
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
      qtyChangeStatus: {
        type: String,
      },
      priceChangeStatus: {
        type: String,
      },
    },
  ],
});

const OrderModels: Model<Order> = mongoose.model<Order>("orders", OrderSchema);

export { OrderModels, Order };
