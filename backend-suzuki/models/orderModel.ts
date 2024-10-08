import mongoose, { Document, Schema, Model } from "mongoose";
import { AdminUsers } from "./adminUserModel";
import Customers from "./customerModel";
import { CarPartStockModels } from "./carPartStockModel";

enum OrderStatus {
  In_Progress = "In Progress",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

interface OrderItemDocRef {
  item_id: mongoose.Schema.Types.ObjectId;
  orderQuantity: Number;
  totalPrice: Number;
  qtyChangeStatus: Boolean;
  priceChangeStatus: Boolean;
  status: OrderStatus;
  confirmQuantity?: Number;
  confirmPrice?: Number;
  remark?: string;
}

interface Order extends Document {
  isDeleted: boolean;
  phoneNumber: string;
  address: string;
  orderDate: Date;
  orderNumber: string;
  customer: mongoose.Schema.Types.ObjectId;
  dealer: mongoose.Schema.Types.ObjectId;
  totalSaleAmount: number;
  totalItem: number;
  status: OrderStatus;
  shippingMethod: string;
  deliverOrder: mongoose.Schema.Types.ObjectId;
  smallOrder: OrderItemDocRef[];
}

const OrderSchema: Schema<Order> = new Schema({
  isDeleted: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderNumber: {
    type: String,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Customers,
    required: true,
  },
  dealer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: AdminUsers,
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
  shippingMethod: {
    type: String,
  },
  deliverOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "deliveryorders",
  },
  smallOrder: {
    type: [
      {
        item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: CarPartStockModels,
        },
        status: {
          type: String,
          enum: Object.values(OrderStatus),
          default: OrderStatus.In_Progress,
        },
        totalPrice: {
          type: Number,
        },
        orderQuantity: {
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
        confirmQuantity: {
          type: Number,
        },
        confirmPrice: {
          type: Number,
        },
        remark: {
          type: String,
        },
      },
    ],
    default: [],
    required: false,
  },
});

const OrderModels: Model<Order> = mongoose.model<Order>("orders", OrderSchema);

export { OrderModels, Order, OrderItemDocRef };
