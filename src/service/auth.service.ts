import HttpException from "../utils/handler/HttpErrorHandler";
import UserModel from "../model/user.model";
import { UserInterface } from "../utils/interface/user.interface";
import { createRefreshToken, createToken } from "../helper/createToken";
import LoginServiceInterface from "../utils/interface/login.service.interface";

// Checking Existing Email
export const checkExistEmailService = async (
  email: string
): Promise<Boolean | Error> => {
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      throw new Error("Email is already exist");
    }
    return true;
  } catch (error: any) {
    throw new HttpException(404, error.message, []);
  }
};

// Add New User
export const registerUserService = async (
  name: string,
  email: string,
  user_name: string,
  password: string,
  role: string
): Promise<UserInterface | Error> => {
  try {
    const user = await UserModel.create({
      name,
      email,
      user_name,
      password,
      role,
    });
    return user;
  } catch (error: any) {
    throw new HttpException(400, "Unable to create new User !", [
      error?.message,
    ]);
  }
};

// Login User
export const loginUserService = async (
  email: string,
  password: string
): Promise<LoginServiceInterface | Error> => {
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid User Email");
    }

    const auth_user = await user.isValidPassword(password);
    if (!auth_user) {
      throw new Error("Invalid User Password");
    }
    if (!user.status) {
      throw new Error("Please Verify Your Account");
    }

    // get Token
    const token: string = createToken({
      _id: user._id,
      name: user.name,
      user_name: user.user_name,
      email: user.email,
      role: user.role,
    });
    // get Refresh Token
    const refreshToken: string = createRefreshToken({ _id: user._id });

    user.login_token.push({
      log_token: { token: token, expire_date: new Date().toDateString() },
      refresh_token: {
        token: refreshToken,
        expire_date: new Date().toDateString(),
      },
    });

    await user.save();

    return { user: user, token: token, refreshToken: refreshToken };
  } catch (error: any) {
    throw new HttpException(404, "Login Not Successfull", [error.message]);
  }
};

// Logout Verify Token Valaidation
export const logoutAuthVerifyTokenService = async (
  token: string
): Promise<Error | Boolean> => {
  try {
    const user_verify_token = await UserModel.findOne({
      login_token: { $elemMatch: { "log_token.token": token } },
    });
    if (user_verify_token) {
      return true;
    }
    throw new Error("Invalid User Token !");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Update Token
export const logoutAuthUpdateTokenService = async (
  token: string
): Promise<Error | void> => {
  try {
    await UserModel.updateOne(
      { "login_token.log_token.token": token },
      {
        $pull: { login_token: { "log_token.token": token } },
      }
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Logout Verify Refresh Token Valaidation
export const verifyRefreshTokenService = async (
  refresh_token: string
): Promise<Error | Boolean> => {
  try {
    const user_verify_token = await UserModel.findOne({
      login_token: { $elemMatch: { "refresh_token.token": refresh_token } },
    });
    if (user_verify_token) {
      return true;
    }
    throw new Error("Invalid Refresh Token !");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Auto logout after refresh token as expired
export const autoLogoutAuthTokenExpiredService = async (
  token: string
): Promise<Error | void> => {
  try {
    await UserModel.updateOne(
      { "login_token.refresh_token.token": token },
      {
        $pull: { login_token: { "refresh_token.token": token } },
      }
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const authRefreshTokenGenrateService = async (
  user_id: string,
  refresh_token: string
): Promise<string | void> => {
  try {
    const user = await UserModel.findById(user_id);
    if (!user) {
      throw new Error("User Data not Found");
    }

    const token = createToken({
      _id: user._id,
      name: user.name,
      user_name: user.user_name,
      email: user.email,
      role: user.role,
    });

    const upaet = await UserModel.updateOne(
      { "login_token.refresh_token.token": refresh_token },
      {
        $set: {
          "login_token.$[elem].log_token.token": token,
          // "login_token.$[elem].log_token.expire_date":
          //   "For Update",
        },
      },
      {
        arrayFilters: [{ "elem.refresh_token.token": { $eq: refresh_token } }],
      }
    );

    console.log("upaet", upaet);

    return token;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default {
  checkExistEmailService,
  registerUserService,
  loginUserService,
  logoutAuthVerifyTokenService,
  logoutAuthUpdateTokenService,
  verifyRefreshTokenService,
  autoLogoutAuthTokenExpiredService,
  authRefreshTokenGenrateService,
};
