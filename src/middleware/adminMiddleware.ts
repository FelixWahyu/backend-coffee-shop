import type { Response, NextFunction } from "express";
import type { UserRequest } from "../type/userRequest";

export const adminMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user || user.role !== "ADMIN") {
    res.status(403).json({
      errors: "Forbidden: Admin access required",
    });
    return;
  }

  next();
};
