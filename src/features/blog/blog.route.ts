import express from "express";
import { BlogController } from "./blog.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const routerBlog = express.Router();

routerBlog.post("/blogs", authMiddleware, BlogController.create);
routerBlog.get("/blogs/detail/:id", authMiddleware, BlogController.getById);
routerBlog.put("/blogs/:id", authMiddleware, BlogController.update);
routerBlog.delete("/blogs/:id", authMiddleware, BlogController.delete);

export default routerBlog;
