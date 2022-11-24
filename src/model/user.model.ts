import { model, Schema } from "mongoose";
import { UserInterface } from "../utils/interface/user.interface";
import bcrypt from "bcrypt";

const UserSchema = new Schema<UserInterface>(
  {
    name: {
      type: String,
      required: [true, "FullName is Require !"],
    },
    user_name: {
      type: String,
      required: [true, "FullName is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },

    role: {
      type: String,
      enum: ["ADMIN", "PROJECT_MANAGER", "DEVELOPER"],
      required: [true, "FullName is Required"],
    },
    status: {
      type: Boolean,
      default: true, //This is true for just developing in production default should be false ,
      required: true,
    },
    login_token: [
      {
        log_token: { token: { type: String }, expire_date: { type: String } },
        refresh_token: {
          token: { type: String },
          expire_date: { type: String },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
UserSchema.pre<UserInterface>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash_password = await bcrypt.hash(this.password, 10);
  this.password = hash_password;

  next();
});
UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | Boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<UserInterface>("User", UserSchema);
