import { NextFunction, Request, Response } from "express";
import { logoutAuthVerifyTokenService } from "../service/auth.service";
import jwtVerifyToken from "../helper/verifyToken";
import HttpException from "../utils/handler/HttpErrorHandler";

const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
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
    // check the token in database is user logout or not
    await logoutAuthVerifyTokenService(bearer_token);

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
