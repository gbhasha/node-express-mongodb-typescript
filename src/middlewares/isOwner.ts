import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req?.params?.id;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    return next();
  } catch (error) {
    console.log("Error in isAuthenticated middleware", error.message);
    res.sendStatus(403);
  }
};
