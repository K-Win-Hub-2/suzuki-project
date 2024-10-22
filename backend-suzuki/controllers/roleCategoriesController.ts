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
      };
      [key: string]: any;
    };

    const dealerDoc = await AdminUsers.findOne({ code: code });

    if (!dealerDoc) {
      return res.status(400).json({ error: "Dealer not found" });
    }

    dealerDoc.labels = saveLabel.labels;
    await dealerDoc.save();

    res.status(201).json({
      message: "Role created successfully",
    });
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

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { labels, subLabels } = req.body;

    const role = await RoleCategories.findById(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    if (labels && Array.isArray(labels)) {
      role.labels = labels;
    }

    if (subLabels && Array.isArray(subLabels)) {
      role.subLabels = subLabels;
    }

    const updatedRole = await role.save();

    return res.status(200).json({
      message: "Role updated successfully",
      data: updatedRole,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    return res.status(500).json({ error: "Failed to update role" });
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
