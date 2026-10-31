"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const responseError_1 = require("../error/responseError");
// import success = require("zod");
const errorMiddleware = (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: error.issues.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            })),
            // errors: `Validation Error : ${JSON.stringify(error)}`,
        });
    }
    else if (error instanceof responseError_1.ResponseError) {
        return res.status(error.status).json({
            success: false,
            message: error.message,
            // errors: error.message,
        });
    }
    else {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
            // errors: "Internal Server Error",
        });
    }
};
exports.errorMiddleware = errorMiddleware;
