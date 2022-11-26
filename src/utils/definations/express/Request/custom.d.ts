import RequestHeaderUserInterface from "../utils/interface/request.user.interface";

declare global {
  namespace Express {
    export interface Request {
      user: RequestHeaderUserInterface;
    }
  }
}
