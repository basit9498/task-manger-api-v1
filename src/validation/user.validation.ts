import { checkSchema } from "express-validator";
import { checkExistEmail } from "../service/auth.service";

const userValidation = () => {
  checkSchema({
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
          checkExistEmail(value);
          //   if (result as Boolean) {
          //     return Promise.reject("Email is already exist");
          //   }
        },
      },
    },
    role: {
      notEmpty: {
        bail: true,
        errorMessage: "Role Required !",
      },
      trim: true,
    },
  });
};

export default userValidation;
