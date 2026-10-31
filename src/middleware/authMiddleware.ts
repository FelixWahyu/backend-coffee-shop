import type { Request, Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import type { UserRequest } from "../type/userRequest";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      errors: "Unauthorized",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      token: token,
    },
  });

  if (!user) {
    return res.status(401).json({
      errors: "Unauthorized",
    });
  }

  req.user = user;
  next();
};
