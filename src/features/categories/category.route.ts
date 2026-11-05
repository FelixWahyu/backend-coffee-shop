import express from "express";
import { CategoryController } from "./category.controller";
import { adminMiddleware } from "../../middleware/adminMiddleware";

const routerCategory = express.Router();

routerCategory.get("/categories", CategoryController.list);
routerCategory.post("/categories", adminMiddleware, CategoryController.create);
routerCategory.get("/categories/edit/:id", adminMiddleware, CategoryController.edit);
routerCategory.put("/categories/:id", adminMiddleware, CategoryController.update);
routerCategory.delete("/categories/:id", adminMiddleware, CategoryController.delete);

export default routerCategory;
