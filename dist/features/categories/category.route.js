"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const routerCategory = express_1.default.Router();
routerCategory.get("/categories", category_controller_1.CategoryController.list);
routerCategory.post("/categories", adminMiddleware_1.adminMiddleware, category_controller_1.CategoryController.create);
routerCategory.get("/categories/edit/:id", adminMiddleware_1.adminMiddleware, category_controller_1.CategoryController.edit);
routerCategory.put("/categories/:id", adminMiddleware_1.adminMiddleware, category_controller_1.CategoryController.update);
routerCategory.delete("/categories/:id", adminMiddleware_1.adminMiddleware, category_controller_1.CategoryController.delete);
exports.default = routerCategory;
