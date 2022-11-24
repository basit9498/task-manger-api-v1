import HttpException from "../utils/handler/HttpErrorHandler";
import UserModel from "../model/user.model";
import { UserInterface } from "../utils/interface/user.interface";

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
export default {
  checkExistEmailService,
  registerUserService,
};
