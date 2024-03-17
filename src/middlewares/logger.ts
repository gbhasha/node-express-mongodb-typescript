import { Request, Response, NextFunction } from "express";
export default (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request logged: ${req.method} ${req.url}`);
  return next();
};
