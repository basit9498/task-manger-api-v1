import jwt from "jsonwebtoken";

export const createToken = (data: object): string => {
  const getToken = jwt.sign(
    data,
    process.env.JWT_TOKEN_SECRET_KEY as jwt.Secret,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRE as string,
    }
  );

  return getToken;
};

export const createRefreshToken = (data: object): string => {
  const getToken = jwt.sign(
    data,
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY as jwt.Secret,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE as string,
    }
  );
  return getToken;
};

export default { createToken, createRefreshToken };
