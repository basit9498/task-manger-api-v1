import jwt from "jsonwebtoken";
import HttpException from "../utils/handler/HttpErrorHandler";

export const jwtVerifyToken = (
  token: string
): Error | jwt.JwtPayload | string => {
  try {
    const decode = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET_KEY as jwt.Secret
    );
    return decode;
  } catch (error: any) {
    throw new HttpException(404, "Authorization Error", [error.message]);
  }
};

export default jwtVerifyToken;
