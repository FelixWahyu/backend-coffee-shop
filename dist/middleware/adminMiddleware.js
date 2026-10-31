"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const adminMiddleware = async (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== "ADMIN") {
        res.status(403).json({
            errors: "Forbidden: Admin access required",
        });
        return;
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
