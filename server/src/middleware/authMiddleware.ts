import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    console.log("isAuthenticated ========>", req.isAuthenticated());
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};
