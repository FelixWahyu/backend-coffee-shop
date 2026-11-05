"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const routerBlog = express_1.default.Router();
routerBlog.post("/blogs", authMiddleware_1.authMiddleware, blog_controller_1.BlogController.create);
routerBlog.get("/blogs/detail/:id", authMiddleware_1.authMiddleware, blog_controller_1.BlogController.getById);
routerBlog.put("/blogs/:id", authMiddleware_1.authMiddleware, blog_controller_1.BlogController.update);
routerBlog.delete("/blogs/:id", authMiddleware_1.authMiddleware, blog_controller_1.BlogController.delete);
exports.default = routerBlog;
