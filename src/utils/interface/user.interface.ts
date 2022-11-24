import { Document } from "mongoose";

interface LoginToken {
  log_token: { token: string; expire_date: string };
  refresh_token: { token: string; expire_date: string };
}

export interface UserInterface extends Document {
  name: string;
  user_name: string;
  password: string;
  email: string;
  role: string;
  status: boolean;
  login_token: LoginToken[];
  isValidPassword(password: string): Promise<Error | boolean>;
}
