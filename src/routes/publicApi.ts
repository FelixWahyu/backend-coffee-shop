import express from "express";
import { UserController } from "../controllers/userController";
import { ProductController } from "../features/product/product.controller";
import { CategoryController } from "../features/categories/category.controller";
import { ReviewController } from "../controllers/reviewController";
import { ImageController } from "../features/uploads/image.controller";
import { BlogController } from "../features/blog/blog.controller";
import { upload } from "../middleware/uploadMiddleware";

const publicRouter = express.Router();

publicRouter.post("/api/users", UserController.register);
publicRouter.post("/api/users/login", UserController.login);
publicRouter.delete("/api/users/current/:username", UserController.delete);

publicRouter.get("/api/categories", CategoryController.list);

publicRouter.get("/api/products", ProductController.list);
publicRouter.get("/api/products/:id", ProductController.get);

publicRouter.get("/api/reviews", ReviewController.getAllReview);

publicRouter.post("/api/upload", upload.single("images"), ImageController.create);

publicRouter.get("/api/blogs", BlogController.list);
publicRouter.get("/api/blogs/:slug", BlogController.getBySlug);

export default publicRouter;
