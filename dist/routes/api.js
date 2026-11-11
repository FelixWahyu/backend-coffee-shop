"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
// import { UserController } from "../features/user/user.controller";
const user_route_1 = __importDefault(require("../features/user/user.route"));
const contactController_1 = require("../controllers/contactController");
const addressController_1 = require("../controllers/addressController");
// import { CategoryController } from "../categories/controllers/category.controller";
const category_route_1 = __importDefault(require("../features/categories/category.route"));
const blog_route_1 = __importDefault(require("../features/blog/blog.route"));
// import { ProductController } from "../features/product/product.controller";
const product_route_1 = __importDefault(require("../features/product/product.route"));
const reviewController_1 = require("../controllers/reviewController");
// import { BlogController } from "../features/blog/blog.controller";
const statsController_1 = require("../controllers/statsController");
const adminMiddleware_1 = require("../middleware/adminMiddleware");
// import { upload } from "../middleware/uploadMiddleware";
// import { UploadImageController } from "../features/uploads/upload.controller";
const upload_route_1 = __importDefault(require("../features/uploads/upload.route"));
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(authMiddleware_1.authMiddleware);
// User API
// apiRouter.get("/api/users/current", UserController.get);
// apiRouter.patch("/api/users/current", UserController.update);
// apiRouter.delete("/api/users/logout", UserController.logout);
// apiRouter.delete("/api/users/current/:username", UserController.delete);
exports.apiRouter.use("/api", user_route_1.default);
// Contact API
exports.apiRouter.post("/api/contacts", contactController_1.ContactController.create);
exports.apiRouter.get("/api/contacts/:contactId", contactController_1.ContactController.get);
exports.apiRouter.put("/api/contacts/:contactId", contactController_1.ContactController.update);
exports.apiRouter.delete("/api/contacts/:contactId", contactController_1.ContactController.delete);
exports.apiRouter.get("/api/contacts", contactController_1.ContactController.search);
// Address API
exports.apiRouter.post("/api/contacts/:contactId/addresses", addressController_1.AddressController.create);
exports.apiRouter.get("/api/contacts/:contactId/addresses/:addressId", addressController_1.AddressController.get);
exports.apiRouter.put("/api/contacts/:contactId/addresses/:addressId", addressController_1.AddressController.update);
exports.apiRouter.delete("/api/contacts/:contactId/addresses/:addressId", addressController_1.AddressController.delete);
exports.apiRouter.get("/api/contacts/:contactId/addresses", addressController_1.AddressController.list);
// Category API
// apiRouter.post("/api/categories", adminMiddleware, CategoryController.create);
// apiRouter.get("/api/categories", CategoryController.list);
// apiRouter.get("/api/categories/edit/:id", adminMiddleware, CategoryController.edit);
// apiRouter.put("/api/categories/:id", adminMiddleware, CategoryController.update);
// apiRouter.delete("/api/categories/:id", adminMiddleware, CategoryController.delete);
exports.apiRouter.use("/api", category_route_1.default);
// apiRouter.post("/api/admin/upload", adminMiddleware, upload.single("image"), UploadImageController.create);
exports.apiRouter.use("/api", upload_route_1.default);
// Product API
// apiRouter.post("/api/products", adminMiddleware, ProductController.create);
// apiRouter.get("/api/products", ProductController.list);
// apiRouter.get("/api/products/:id", ProductController.get);
// apiRouter.patch("/api/products/:id", adminMiddleware, ProductController.update);
// apiRouter.delete("/api/products/:id", adminMiddleware, ProductController.delete);
exports.apiRouter.use("/api", product_route_1.default);
// Review API
exports.apiRouter.post("/api/reviews", reviewController_1.ReviewController.create);
exports.apiRouter.get("/api/reviews", reviewController_1.ReviewController.getAllReview);
exports.apiRouter.delete("/api/reviews/:id", reviewController_1.ReviewController.delete);
// Blog API (Admin)
// apiRouter.post("/api/blogs", adminMiddleware, BlogController.create);
// apiRouter.get("/api/blogs/detail/:id", adminMiddleware, BlogController.getById);
// apiRouter.put("/api/blogs/:id", adminMiddleware, BlogController.update);
// apiRouter.delete("/api/blogs/:id", adminMiddleware, BlogController.delete);
exports.apiRouter.use("/api", blog_route_1.default);
// Admin Stats API
exports.apiRouter.get("/api/admin/stats", adminMiddleware_1.adminMiddleware, statsController_1.StatsController.get);
// Admin User API
// apiRouter.get("/api/admin/users", adminMiddleware, UserController.adminList);
// apiRouter.get("/api/admin/users/:username", adminMiddleware, UserController.adminGet);
// apiRouter.post("/api/admin/users", adminMiddleware, UserController.adminCreate);
// apiRouter.put("/api/admin/users/:username", adminMiddleware, UserController.adminUpdate);
// apiRouter.delete("/api/admin/users/:username", adminMiddleware, UserController.adminDelete);
