import { NextFunction, Request, Response } from "express";
import getValidationReport from "../utils/handler/validation.error.handler";
import { validationResult } from "express-validator";
import HttpException from "../utils/handler/HttpErrorHandler";
import { registerUserService } from "../service/auth.service";

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

export default {
  authRegister,
};
