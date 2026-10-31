import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { UserController } from "../controllers/userController";
import { ContactController } from "../controllers/contactController";
import { AddressController } from "../controllers/addressController";
// import { CategoryController } from "../categories/controllers/category.controller";
import routerCategory from "../categories/category.route";
import { ProductController } from "../controllers/productController";
import { ReviewController } from "../controllers/reviewController";
import { BlogController } from "../controllers/blogController";
import { StatsController } from "../controllers/statsController";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { upload } from "../middleware/uploadMiddleware";
import { UploadImageController } from "../controllers/upload.controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/logout", UserController.logout);
apiRouter.delete("/api/users/current/:username", UserController.delete);

// Contact API
apiRouter.post("/api/contacts", ContactController.create);
apiRouter.get("/api/contacts/:contactId", ContactController.get);
apiRouter.put("/api/contacts/:contactId", ContactController.update);
apiRouter.delete("/api/contacts/:contactId", ContactController.delete);
apiRouter.get("/api/contacts", ContactController.search);

// Address API
apiRouter.post("/api/contacts/:contactId/addresses", AddressController.create);
apiRouter.get("/api/contacts/:contactId/addresses/:addressId", AddressController.get);
apiRouter.put("/api/contacts/:contactId/addresses/:addressId", AddressController.update);
apiRouter.delete("/api/contacts/:contactId/addresses/:addressId", AddressController.delete);
apiRouter.get("/api/contacts/:contactId/addresses", AddressController.list);

// Category API
// apiRouter.post("/api/categories", adminMiddleware, CategoryController.create);
// apiRouter.get("/api/categories", CategoryController.list);
// apiRouter.get("/api/categories/edit/:id", adminMiddleware, CategoryController.edit);
// apiRouter.put("/api/categories/:id", adminMiddleware, CategoryController.update);
// apiRouter.delete("/api/categories/:id", adminMiddleware, CategoryController.delete);
apiRouter.use("/api", routerCategory);
apiRouter.post("/api/admin/upload", adminMiddleware, upload.single("image"), UploadImageController.create);

// Product API
apiRouter.post("/api/products", adminMiddleware, ProductController.create);
apiRouter.get("/api/products", ProductController.list);
apiRouter.get("/api/products/:id", ProductController.get);
apiRouter.patch("/api/products/:id", adminMiddleware, ProductController.update);
apiRouter.delete("/api/products/:id", adminMiddleware, ProductController.delete);

// Review API
apiRouter.post("/api/reviews", ReviewController.create);
apiRouter.get("/api/reviews", ReviewController.getAllReview);

// Blog API (Admin)
apiRouter.post("/api/blogs", adminMiddleware, BlogController.create);
apiRouter.get("/api/blogs/detail/:id", adminMiddleware, BlogController.getById);
apiRouter.put("/api/blogs/:id", adminMiddleware, BlogController.update);
apiRouter.delete("/api/blogs/:id", adminMiddleware, BlogController.delete);

// Admin Stats API
apiRouter.get("/api/admin/stats", adminMiddleware, StatsController.get);

// Admin User API
apiRouter.get("/api/admin/users", adminMiddleware, UserController.adminList);
apiRouter.get("/api/admin/users/:username", adminMiddleware, UserController.adminGet);
apiRouter.post("/api/admin/users", adminMiddleware, UserController.adminCreate);
apiRouter.put("/api/admin/users/:username", adminMiddleware, UserController.adminUpdate);
apiRouter.delete("/api/admin/users/:username", adminMiddleware, UserController.adminDelete);
