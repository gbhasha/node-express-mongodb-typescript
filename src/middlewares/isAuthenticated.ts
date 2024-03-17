import { Request, Response, NextFunction } from "express";
import { merge } from "lodash";

import { UserService } from "../services/UserService";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userService = new UserService();

    const sessionToken = req?.cookies[process.env.COOKIE_NAME];

    if (!sessionToken) {
      res.sendStatus(403);
    }

    const existingUser = await userService.getUsersBySessionToken(sessionToken);

    if (!existingUser) {
      res.sendStatus(403);
    }
    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log("Error in isAuthenticated middleware", error.message);
    res.sendStatus(403);
  }
};
