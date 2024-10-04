import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../helpers/responseHelper";

export const checkAdminType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isSuperAdmin)
    return res.status(403).json(
      errorResponse({
        statusCode: 403,
        message: "Access denied: Administrative privileges are required.",
        data: null,
      })
    );
  next();
};

export const checkAdminOrSelf = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.user.isSuperAdmin &&
    req.user.id.toString() != req.params.id.toString()
  )
    return res.status(403).json(
      errorResponse({
        statusCode: 403,
        message:
          "Access denied: Only administrative or self-account can be edited.",
        data: null,
      })
    );
  next();
};
