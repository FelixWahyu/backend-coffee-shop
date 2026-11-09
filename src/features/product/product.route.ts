import express from "express";
import { adminMiddleware } from "../../middleware/adminMiddleware";
import { ProductController } from "./product.controller";

const routerProduct = express.Router();

routerProduct.get("/products", adminMiddleware, ProductController.list);
routerProduct.get("/products/:id", adminMiddleware, ProductController.get);
routerProduct.post("/products", adminMiddleware, ProductController.create);
routerProduct.patch("/products/:id", adminMiddleware, ProductController.update);
routerProduct.delete("/products/:id", adminMiddleware, ProductController.delete);

export default routerProduct;
