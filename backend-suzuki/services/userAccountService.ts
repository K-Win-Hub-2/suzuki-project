import {
  CustomerData,
  UserDatas,
  customerDataToImplementDatabase,
  superAdminAccountDataToImplementDatabase,
} from "../helpers/accountDataMappers";
import { errorResponse, successResponse } from "../helpers/responseHelper";
import { AdminUser, AdminUsers } from "../models/adminUserModel";
import Customers from "../models/customerModel";
import mongoose from "mongoose";
import { RegionsModels } from "../models/regionModel";
import { TownShipModels } from "../models/newTownShipModel";
import "dotenv/config";

//Factory Pattern For Account
class UserAccountServiceFactory {
  accountType(name: string) {
    switch (name) {
      case "admin":
        const adminAccount = new AdminAccountService(true);
        return adminAccount;
      case "dealer":
        const dealerAccount = new AdminAccountService(false);
        return dealerAccount;
      case "user":
        return new CustomerAccountService();

      default:
        return new CustomerAccountService();
    }
  }
}

class AdminAccountService {
  isSuperAdmin: boolean;

  constructor(isSuperAdmin: boolean) {
    this.isSuperAdmin = isSuperAdmin;
  }

  public async read(datas: Partial<UserDatas>) {
    const result = await AdminUsers.findOne(datas).populate("authorizedRole");
    return result;
  }

  public async listAll() {
    const query = { isDeleted: false, isSuperAdmin: this.isSuperAdmin };
    const users = await AdminUsers.find(query)
      .select("-password")
      .populate("showroom");
    return successResponse({
      statusCode: 200,
      message: "These are all admin datas",
      data: users,
    });
  }

  public async create(file: any, data: AdminUser) {
    data.isSuperAdmin = this.isSuperAdmin;

    if (process.env.NODE_ENV === "development") {
      console.log("req data", data);
    }

    // const searchAccount = await AdminUsers.findOne({ email: data.email });

    // if (!searchAccount)
    //   return errorResponse({
    //     statusCode: 404,
    //     message: "This email is already taken",
    //     data: null,
    //   });

    if (
      !this.isSuperAdmin &&
      data.shippingMethod &&
      typeof data.shippingMethod === "string"
    ) {
      try {
        data.shippingMethod = JSON.parse(data.shippingMethod);
      } catch (error) {
        return errorResponse({
          statusCode: 201,
          message: "Invalid Shipping Method",
          data: null,
        });
      }
    }

    if (!this.isSuperAdmin && data.region && typeof data.region === "string") {
      try {
        const regionDoc = await RegionsModels.findOneAndUpdate(
          { region: data.region },
          {},
          { new: true, upsert: true }
        );
        data.region = regionDoc._id as any as mongoose.Schema.Types.ObjectId;
      } catch (error) {
        console.error("Error updating region document:", error);
        return errorResponse({
          statusCode: 500,
          message: "Failed to update region",
          data: null,
        });
      }
    }

    if (
      !this.isSuperAdmin &&
      data.townShip &&
      typeof data.townShip === "string"
    ) {
      try {
        const townShipDoc = await TownShipModels.findOneAndUpdate(
          { townShip: data.townShip },
          {},
          { new: true, upsert: true }
        );
        data.townShip =
          townShipDoc._id as any as mongoose.Schema.Types.ObjectId;
      } catch (error) {
        console.error("Error updating township document:", error);
        return errorResponse({
          statusCode: 500,
          message: "Failed to update township",
          data: null,
        });
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.log("admin formatted", data);
    }

    if (file) {
      data.url = file.location;
    }

    const result = await AdminUsers.create(data);
    return successResponse({
      statusCode: 200,
      message: "User Created successfully",
      data: result,
    });
  }

  public async readById(id: mongoose.Types.ObjectId) {
    const result = await AdminUsers.findById(id).populate("showroom");
    return successResponse({
      statusCode: 200,
      message: "This is user by id",
      data: result,
    });
  }

  public async updateById(file: any, id: mongoose.Types.ObjectId, datas: any) {
    datas.isSuperAdmin = this.isSuperAdmin;

    if (file) {
      datas.url = file.location;
    }

    const formattedData: any = superAdminAccountDataToImplementDatabase(datas);

    if (
      !this.isSuperAdmin &&
      datas.shippingMethod &&
      typeof datas.shippingMethod === "string"
    ) {
      try {
        datas.shippingMethod = JSON.parse(datas.shippingMethod);
      } catch (error) {
        return errorResponse({
          statusCode: 201,
          message: "Invalid Shipping Method",
          data: null,
        });
      }
    }

    if (datas.region && typeof datas.region === "string") {
      try {
        const regionDoc = await RegionsModels.findOneAndUpdate(
          { region: datas.region },
          {},
          { new: true, upsert: true }
        );
        formattedData.region = regionDoc._id as mongoose.Schema.Types.ObjectId;
      } catch (error) {
        console.error("Error updating region document:", error);
        return errorResponse({
          statusCode: 500,
          message: "Failed to update region",
          data: null,
        });
      }
    }

    if (datas.townShip && typeof datas.townShip === "string") {
      try {
        const townShipDoc = await TownShipModels.findOneAndUpdate(
          { townShip: datas.townShip },
          {},
          { new: true, upsert: true }
        );
        formattedData.townShip =
          townShipDoc._id as mongoose.Schema.Types.ObjectId;
      } catch (error) {
        console.error("Error updating township document:", error);
        return errorResponse({
          statusCode: 500,
          message: "Failed to update township",
          data: null,
        });
      }
    }

    if (datas.labels && Array.isArray(datas.labels)) {
      formattedData.labels = datas.labels;
    }

    const result = await AdminUsers.findOneAndUpdate(
      { _id: id },
      formattedData,
      { new: true }
    );

    if (process.env.NODE_ENV === "development") {
      console.log("formatted Update Data", id, formattedData);
    }

    return successResponse({
      statusCode: 200,
      message: "Admin Account Updated successfully",
      data: result,
    });
  }

  public async delete(id: mongoose.Types.ObjectId) {
    const result = await AdminUsers.findByIdAndUpdate(id, { isDeleted: true });
    return successResponse({
      statusCode: 200,
      message: "Account deleted successfully",
      data: result,
    });
  }

  public ban(name: string) {
    console.log(`Banned: ${name} , He Banned:`);
  }
}

class CustomerAccountService {
  constructor() {}
  public async read(datas: Partial<CustomerData>) {
    const result = await Customers.findOne(datas);
    if (process.env.NODE_ENV === "development") {
      console.log("Result", result, datas);
    }
    return result;
  }

  public async listAll() {
    const users = await Customers.find().select("-password");
    return successResponse({
      statusCode: 200,
      message: "These are all user datas",
      data: users,
    });
  }

  public async create(file: any, data: CustomerData) {
    if (file) {
      data.url = file.location;
    }
    const formattedData = customerDataToImplementDatabase(data);
    //search account for this email exist or not
    const searchAccount = await Customers.findOne({
      email: formattedData.email,
    });
    if (searchAccount)
      return errorResponse({
        statusCode: 201,
        message: "This email is already taken",
        data: null,
      });

    const result = await Customers.create(formattedData);
    return successResponse({
      statusCode: 200,
      message: "User Account Created successfully",
      data: result,
    });
  }

  public async readById(id: mongoose.Types.ObjectId) {
    const result = await Customers.findById(id);
    return successResponse({
      statusCode: 200,
      message: "This is user by id",
      data: result,
    });
  }
  public async updateById(
    file: any,
    id: mongoose.Types.ObjectId,
    datas: CustomerData
  ) {
    if (file) {
      datas.url = file.location;
    }
    const formattedData = customerDataToImplementDatabase(datas); // if email exists in update data, then search new email in database and it exists in database, return can't use two email response
    const result = await Customers.findOneAndUpdate(
      { _id: id },
      formattedData,
      { new: true }
    );
    return successResponse({
      statusCode: 200,
      message: "User Account Updated successfully",
      data: result,
    });
  }
  async delete(id: mongoose.Types.ObjectId) {
    const result = await Customers.findByIdAndUpdate(id, { isDeleted: true });
    return successResponse({
      statusCode: 200,
      message: "Account deleted successfully",
      data: result,
    });
  }
}

export {
  UserAccountServiceFactory,
  AdminAccountService,
  CustomerAccountService,
};
