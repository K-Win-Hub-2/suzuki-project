import mongoose, { Document, Schema, Model } from "mongoose";

interface FeedbackModel extends Document {
  isDeleted: boolean;
  feedback: string;
  rating: number;
  createdAt: Date;
  customerId: mongoose.Schema.Types.ObjectId;
  orderId: mongoose.Schema.Types.ObjectId;
}

const FeedbackSchema: Schema<FeedbackModel> = new Schema({
  isDeleted: {
    type: Boolean,
    default: false,
  },
  feedback: {
    type: String,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customers",
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "orders",
  },
});

const FeedbackModel: Model<FeedbackModel> = mongoose.model(
  "feedbacks",
  FeedbackSchema
);

export { FeedbackModel };
