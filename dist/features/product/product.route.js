"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const product_controller_1 = require("./product.controller");
const routerProduct = express_1.default.Router();
routerProduct.get("/products", adminMiddleware_1.adminMiddleware, product_controller_1.ProductController.list);
routerProduct.get("/products/:id", adminMiddleware_1.adminMiddleware, product_controller_1.ProductController.get);
routerProduct.post("/products", adminMiddleware_1.adminMiddleware, product_controller_1.ProductController.create);
routerProduct.patch("/products/:id", adminMiddleware_1.adminMiddleware, product_controller_1.ProductController.update);
routerProduct.delete("/products/:id", adminMiddleware_1.adminMiddleware, product_controller_1.ProductController.delete);
exports.default = routerProduct;
