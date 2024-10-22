import mongoose, { Document, Schema, Model } from "mongoose";
import { AdminUsers } from "./adminUserModel";

interface SubMenu {
  label: string;
}

interface SubLabel {
  label: string;
  subMenu: SubMenu[];
}

interface RoleCategories extends Document {
  labels: string[];
  subLabels?: SubLabel[];
  isDeleted: boolean;
  code?: string;
  dealerId?: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const RoleCategoriesSchema: Schema = new Schema({
  labels: {
    type: [String],
  },
  subLabels: [
    {
      label: {
        type: String,
      },
      subMenu: [
        {
          label: {
            type: String,
          },
        },
      ],
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
  },
  dealerId: {
    type: mongoose.Types.ObjectId,
    ref: "AdminUsers",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RoleCategories: Model<RoleCategories> = mongoose.model<RoleCategories>(
  "roleCategories",
  RoleCategoriesSchema
);

export { RoleCategories, RoleCategoriesSchema };
