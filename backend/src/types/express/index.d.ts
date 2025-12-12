import { IUser } from "../../interfaces/user.schema";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // now req.user is recognized everywhere
    }
  }
}
