import { Request, Response } from "express";
import { RoleCategories } from "../models/roleCategoriesModel";
import { AdminUsers } from "../models/adminUserModel";
import mongoose from "mongoose";

export const createRole = async (req: Request, res: Response) => {
  try {
    const { code, saveLabel, ...rest } = req.body as {
      code: string;
      saveLabel: {
        labels: string[];
        subLabels: Array<{
          label: string;
          subMenu: Array<{ label: string }>;
        }>;
      };
      [key: string]: any;
    };

    const dealerDoc = await AdminUsers.findOne({ code: code });

    if (!dealerDoc) {
      return res.status(400).json({ error: "Dealer not found" });
    }

    const roleCategoryData = {
      ...rest,
      dealerId: dealerDoc._id,
      labels: saveLabel.labels,
      subLabels: saveLabel.subLabels.map((subLabel) => ({
        label: subLabel.label,
        subMenu: subLabel.subMenu.map((subMenu) => ({ label: subMenu.label })),
      })),
      code: code,
    };

    const data = await RoleCategories.create(roleCategoryData);

    dealerDoc.authorizedRole = data._id as mongoose.Schema.Types.ObjectId;
    await dealerDoc.save();

    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to create role and update admin user" });
  }
};

export const createRoleOnly = async (req: Request, res: Response) => {
  try {
    const { labels, subLabels } = req.body;

    const newRoleCategory = new RoleCategories({
      labels,
      subLabels,
    });

    await newRoleCategory.save();

    res.status(201).json(newRoleCategory);
  } catch (error) {
    console.error("Error saving RoleCategory:", error);
    res.status(500).json({ error: "Failed to create role category" });
  }
};

export const getRole = async (req: Request, res: Response) => {
  try {
    const data = await RoleCategories.find({ isDeleted: false });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get roles" });
  }
};
