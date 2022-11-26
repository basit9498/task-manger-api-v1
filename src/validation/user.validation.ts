import { checkSchema } from "express-validator";
import {
  checkExistEmailService,
  logoutAuthVerifyTokenService,
} from "../service/auth.service";

const role_value: string[] = ["ADMIN", "PROJECT_MANAGER", "DEVELOPER"];

export const userValidation = checkSchema({
  name: {
    notEmpty: {
      bail: true,
      errorMessage: "Full Name Required !",
    },
    trim: true,
  },
  user_name: {
    notEmpty: {
      bail: true,
      errorMessage: "User_Name Required !",
    },
    trim: true,
  },
  password: {
    notEmpty: {
      bail: true,
      errorMessage: "Password Required !",
    },
    trim: true,
  },
  conform_password: {
    notEmpty: {
      bail: true,
      errorMessage: "Conform Password Required !",
    },
    trim: true,
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          return Promise.reject();
        }
        return Promise.resolve();
      },
      errorMessage: "Password & Conform Password not matched !",
    },
  },
  email: {
    notEmpty: {
      bail: true,
      errorMessage: "Email Required !",
    },
    isEmail: {
      bail: true,
      errorMessage: "Invalid Email !",
    },
    trim: true,
    custom: {
      options: (value) => {
        return checkExistEmailService(value)
          .then((data) => {
            if (data) {
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          })
          .catch((error) => {
            return Promise.reject(error.message);
          });
      },
    },
  },
  role: {
    notEmpty: {
      bail: true,
      errorMessage: "Role Required !",
    },
    trim: true,
    custom: {
      options: (value) => {
        if (role_value.includes(value)) {
          return Promise.resolve();
        }
        return Promise.reject();
      },
      errorMessage: `role value should be ["ADMIN", "PROJECT_MANAGER", "DEVELOPER"]`,
    },
  },
});

export const userValidationLogin = checkSchema({
  email: {
    notEmpty: {
      bail: true,
      errorMessage: "Email Required !",
    },
    isEmail: {
      bail: true,
      errorMessage: "Invalid Email !",
    },
    trim: true,
  },
  password: {
    notEmpty: {
      bail: true,
      errorMessage: "Password Required !",
    },
    trim: true,
  },
});

export const userValidationLogout = checkSchema({
  token: {
    notEmpty: {
      errorMessage: "Please provide login token !",
      bail: true,
    },
    custom: {
      options: (value) => {
        return logoutAuthVerifyTokenService(value)
          .then((verify) => {
            console.log("verify", verify);
            if (verify) {
              return Promise.resolve();
            }
            return Promise.reject();
          })
          .catch((error: any) => {
            return Promise.reject(error.message);
          });
      },
    },
  },
});

export default { userValidation, userValidationLogin, userValidationLogout };
