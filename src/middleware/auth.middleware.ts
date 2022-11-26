import { NextFunction, Request, Response } from "express";
import jwtVerifyToken from "../helper/verifyToken";
import HttpException from "../utils/handler/HttpErrorHandler";

const isAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void | NextFunction => {
  try {
    const getAuthHeader = req.get("Authorization");

    if (!getAuthHeader) {
      throw new HttpException(404, "Authorization Error", [
        "Auth header is not found !",
      ]);
    }

    if (getAuthHeader.split(" ")[0] !== "Bearer") {
      throw new HttpException(404, "Authorization Error", [
        "Bearer Token is not found !",
      ]);
    }

    const bearer_token = getAuthHeader.split(" ")[1];
    // Verfity the Token
    const token_detail = jwtVerifyToken(bearer_token);
    //
    req.user = token_detail;
    return next();
  } catch (error: any) {
    next(error);
  }
};

export default isAuth;
