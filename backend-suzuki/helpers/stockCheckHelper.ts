import { CarPartStockModels } from "../models/carPartStockModel";
import mongoose from "mongoose";

export const checkStockByDealerAndItems = async (
  dealerId: string,
  stockItems: Array<{
    partNumber: string;
    name: string;
    requestedQuantity: number;
  }>
) => {
  const availableStockResults: any[] = [];

  for (const item of stockItems) {
    const { partNumber, name, requestedQuantity } = item;

    const stockDocs = await CarPartStockModels.find({
      partNumber,
      name: new mongoose.Types.ObjectId(name),
      dealerId,
      isDeleted: false,
    });

    console.log("stockDocs", stockDocs);

    if (stockDocs.length === 0) {
      availableStockResults.push({
        partNumber,
        name,
        requestedQuantity,
        status: "not available",
        availableQuantity: 0,
        dealer: dealerId,
      });
      continue;
    }

    for (const stock of stockDocs) {
      const availableQuantity = stock.totalQuantity;
      let status = "available";
      let quantityProvided = requestedQuantity;

      // Determine availability status
      if (availableQuantity === 0) {
        status = "not available";
        quantityProvided = 0;
      } else if (availableQuantity < requestedQuantity) {
        status = "partial available";
        quantityProvided = availableQuantity;
      }

      availableStockResults.push({
        partNumber,
        name,
        requestedQuantity,
        status,
        availableQuantity: stock.totalQuantity,
        dealer: stock.dealerId,
      });
    }
  }

  return availableStockResults;
};

export const FilterStockByTownShipAndRegion = async (
  townShipId: mongoose.Types.ObjectId | null,
  regionId: mongoose.Types.ObjectId | null,
  carPartName: mongoose.Types.ObjectId
) => {
  let matchStage: any = {
    isDeleted: false,
    name: carPartName,
  };

  if (regionId) {
    matchStage["dealerId.region"] = regionId;
  }

  if (townShipId) {
    matchStage["dealerId.townShip"] = townShipId;
  }

  const stocks = await CarPartStockModels.aggregate([
    {
      $match: matchStage,
    },

    {
      $lookup: {
        from: "adminusers",
        localField: "dealerId",
        foreignField: "_id",
        as: "dealer",
      },
    },

    {
      $unwind: "$dealer",
    },

    {
      $lookup: {
        from: "carparttitles",
        localField: "name",
        foreignField: "_id",
        as: "name",
      },
    },

    {
      $unwind: "$name",
    },

    {
      $match: {
        ...(regionId && { "dealer.region": regionId }),
        ...(townShipId && { "dealer.townShip": townShipId }),
      },
    },

    {
      $project: {
        partNumber: 1,
        partName: 1,
        colorName: 1,
        colorCode: 1,
        name: {
          _id: 1,
          url: 1,
          originalPrice: 1,
          name: 1,
        },
        url: 1,
        totalQuantity: 1,
        originalPrice: 1,
        discountPrice: 1,
        promotionPrice: 1,
        description: 1,
        discountPercentage: 1,
        dealer: {
          _id: 1,
          userName: 1,
          name: 1,
          email: 1,
          phone: 1,
          address: 1,
          region: 1,
          townShip: 1,
          isBanned: 1,
        },
      },
    },
  ]);

  console.log("matchStage", matchStage);

  return stocks;
};

export const checkStockAvailability = async (
  dealerId: string,
  stockItems: Array<any>
) => {
  let availableStockResults: any[] = [];
  let multiDealerStockResults: any[] = [];
  let singleDealerStockResults: any[] = [];

  for (const items of stockItems) {
    const { name, requestedQuantity, partNumber } = items;

    // we need to select some fields for specific requirements
    const stockDocs = await CarPartStockModels.find({
      partNumber,
      name: new mongoose.Types.ObjectId(name),
      isDeleted: false,
    }).populate({
      path: "dealerId",
      select: "name region townShip",
    });

    if (stockDocs.length === 0) {
      availableStockResults.push({
        partNumber,
        name,
        requestedQuantity,
        status: "not available",
        availableQuantity: 0,
        dealer: null,
      });
      continue;
    }

    if (stockDocs.length > 1) {
      multiDealerStockResults.push(
        ...stockDocs.map((stock) => ({
          ...stock.toObject(),
          status:
            stock.totalQuantity >= requestedQuantity
              ? "available"
              : stock.totalQuantity > 0
              ? "partial available"
              : "not available",
        }))
      );
    } else {
      singleDealerStockResults.push(
        ...stockDocs.map((stock) => ({
          ...stock.toObject(),
          status:
            stock.totalQuantity >= requestedQuantity
              ? "available"
              : stock.totalQuantity > 0
              ? "partial available"
              : "not available",
        }))
      );
    }

    for (const stock of stockDocs) {
      const availableQuantity = stock.totalQuantity;

      let status;
      let quantityProvided;

      if (dealerId) {
        if (!stock.dealerId || stock.dealerId.toString() !== dealerId) {
          continue;
        }
      }

      if (availableQuantity >= requestedQuantity) {
        status = "available";
        quantityProvided = requestedQuantity;
      } else if (availableQuantity > 0) {
        status = "partial available";
        quantityProvided = availableQuantity;
      } else {
        status = "not available";
        quantityProvided = 0;
      }

      availableStockResults.push({
        partNumber,
        name,
        requestedQuantity,
        status,
        availableQuantity: quantityProvided,
        dealer: stock.dealerId,
      });
    }

    return {
      availableStockResults,
      singleDealerStockResults:
        singleDealerStockResults.length > 0 ? singleDealerStockResults : null,
      multiDealerStockResults:
        multiDealerStockResults.length > 0 ? multiDealerStockResults : null,
    };
  }
};
