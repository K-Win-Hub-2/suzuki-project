import mongoose, { Document, Schema, Model } from "mongoose";

interface CustomNotification extends Document {
  title: string;
  message: string;
  isChoose: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

enum NotificationType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

const CustomNotificationSchema: Schema = new Schema({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  isChoose: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: Object.values(NotificationType),
    default: NotificationType.CREATE,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const CustomNotificationModel: Model<CustomNotification> =
  mongoose.model<CustomNotification>(
    "CustomNotification",
    CustomNotificationSchema
  );

export { CustomNotificationModel, CustomNotification };
