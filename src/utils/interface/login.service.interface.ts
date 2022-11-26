import { UserInterface } from "./user.interface";

interface LoginServiceInterface {
  user: UserInterface;
  token: string;
  refreshToken: string;
}

export default LoginServiceInterface;
