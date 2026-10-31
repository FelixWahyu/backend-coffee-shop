import type { NextFunction, Response, Request } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/responseError";
// import success = require("zod");

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
      // errors: `Validation Error : ${JSON.stringify(error)}`,
    });
  } else if (error instanceof ResponseError) {
    return res.status(error.status).json({
      success: false,
      message: error.message,
      // errors: error.message,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      // errors: "Internal Server Error",
    });
  }
};
