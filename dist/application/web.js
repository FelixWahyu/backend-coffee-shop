"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const publicApi_1 = __importDefault(require("../routes/publicApi"));
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const api_1 = require("../routes/api");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_2 = require("./cors");
if (!process.env.BASE_FRONTEND_API_URL) {
    throw new Error("BASE_FRONTEND_API_URL is not defined");
}
exports.web = (0, express_1.default)();
exports.web.use((0, cors_1.default)(cors_2.corsOptions));
exports.web.use((0, cookie_parser_1.default)());
exports.web.use(express_1.default.json());
exports.web.use("/public", express_1.default.static("public"));
exports.web.use(publicApi_1.default);
exports.web.use(api_1.apiRouter);
exports.web.use(errorMiddleware_1.errorMiddleware);
