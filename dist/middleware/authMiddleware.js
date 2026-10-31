"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const database_1 = require("../application/database");
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            errors: "Unauthorized",
        });
    }
    const user = await database_1.prismaClient.user.findFirst({
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
exports.authMiddleware = authMiddleware;
