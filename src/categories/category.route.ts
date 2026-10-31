import express from "express";
import { CategoryController } from "./controllers/category.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const routerCategory = express.Router();

routerCategory.get("/categories", CategoryController.list);
routerCategory.post("/categories", authMiddleware, adminMiddleware, CategoryController.create);
routerCategory.get("/categories/edit/:id", authMiddleware, adminMiddleware, CategoryController.edit);
routerCategory.put("/categories/:id", authMiddleware, adminMiddleware, CategoryController.update);
routerCategory.delete("/categories/:id", authMiddleware, adminMiddleware, CategoryController.delete);

export default routerCategory;
