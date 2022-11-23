import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import ErrorMiddleware from "../utils/interface/error.middleware.interface";

const errorMiddleware: ErrorRequestHandler = (
  err: ErrorMiddleware,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(err.status | 404).json({
    error: err.message,
    detail: err.error_detail,
  });
};

export default errorMiddleware;
