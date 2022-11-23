import HttpException from "../utils/handler/HttpErrorHandler";
import UserModel from "../model/user.model";

export const checkExistEmail = async (email: string): Promise<void | Error> => {
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return Promise.reject("Email is already exist");
    }
    return Promise.resolve();
  } catch (error: any) {
    throw new HttpException(404, "Email Checking", error.message);
  }
};

export default {
  checkExistEmail,
};
