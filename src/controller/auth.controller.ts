import { NextFunction, Request, Response } from "express";
import getValidationReport from "../utils/handler/validation.error.handler";
import { validationResult } from "express-validator";
import HttpException from "../utils/handler/HttpErrorHandler";
import {
  authRefreshTokenGenrateService,
  autoLogoutAuthTokenExpiredService,
  loginUserService,
  logoutAuthUpdateTokenService,
  registerUserService,
} from "../service/auth.service";
import LoginServiceInterface from "../utils/interface/login.service.interface";
import { jwtVerifyRefreshToken } from "../helper/verifyToken";
import isTokenExpired from "../helper/isTokenExpired";
import { Jwt, JwtPayload } from "jsonwebtoken";

export const authRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const error_detail = getValidationReport(validationResult(req).array());
    if (error_detail?.length > 0) {
      throw new HttpException(
        400,
        "User Registeration Validation Error",
        error_detail
      );
    }

    // Req.body
    const { name, email, user_name, password, role } = req.body;
    const user = await registerUserService(
      name,
      email,
      user_name,
      password,
      role
    );
    res.json({
      message: "User has been successfully registered ",
      user,
    });
  } catch (error: any) {
    next(error);
  }
};

// login

const authLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const error_detail = getValidationReport(validationResult(req).array());
    if (error_detail?.length > 0) {
      throw new HttpException(400, "User Login Validation Error", error_detail);
    }

    const { email, password } = req.body;
    const user_data = await loginUserService(email, password);
    const user_detail: LoginServiceInterface =
      user_data as LoginServiceInterface;

    const user_filter: object = {
      _id: user_detail.user._id,
      name: user_detail.user.name,
      role: user_detail.user.role,
      user_name: user_detail.user.user_name,
    };

    res.status(200).json({
      message: "Login Successfull",
      user: user_filter,
      tokon: user_detail.token,
      refresh_token: user_detail.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

// Logout
const authLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validation
    const error_detail = getValidationReport(validationResult(req).array());
    if (error_detail?.length > 0) {
      throw new HttpException(
        400,
        "User Logout Validation Error",
        error_detail
      );
    }

    // Remove the token form DataBase
    await logoutAuthUpdateTokenService(req.body.token);
    res.json({
      message: "User Logout Successfully",
    });
  } catch (error: any) {
    next(error);
  }
};

// Refresh Token

const authRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validation
    const error_detail = getValidationReport(validationResult(req).array());
    if (error_detail?.length > 0) {
      throw new HttpException(
        400,
        "Refrest Token Validation Error",
        error_detail
      );
    }

    const { refresh_token } = req.body;

    const token_check: boolean = isTokenExpired(refresh_token);
    if (token_check) {
      // Remove this token from Data base like automayically logout
      autoLogoutAuthTokenExpiredService(refresh_token);
      throw new HttpException(400, "Refrest Token Expired Error", [
        "This token has been expired please login again !",
      ]);
    }

    const token_detail = jwtVerifyRefreshToken(refresh_token);
    const convert_token_ts: JwtPayload = token_detail as JwtPayload;

    // update new token
    const new_token = await authRefreshTokenGenrateService(
      convert_token_ts?._id,
      refresh_token
    );

    res.status(200).json({
      message: "Token Update ",
      token: new_token,
    });
  } catch (error: any) {
    next(error);
  }
};
export default {
  authRegister,
  authLogin,
  authLogout,
  authRefreshToken,
};
