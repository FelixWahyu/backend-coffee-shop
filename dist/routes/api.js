"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
const contactController_1 = require("../controllers/contactController");
const addressController_1 = require("../controllers/addressController");
const categoryController_1 = require("../controllers/categoryController");
const productController_1 = require("../controllers/productController");
const reviewController_1 = require("../controllers/reviewController");
const blogController_1 = require("../controllers/blogController");
const statsController_1 = require("../controllers/statsController");
const adminMiddleware_1 = require("../middleware/adminMiddleware");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const upload_controller_1 = require("../controllers/upload.controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(authMiddleware_1.authMiddleware);
// User API
exports.apiRouter.get("/api/users/current", userController_1.UserController.get);
exports.apiRouter.patch("/api/users/current", userController_1.UserController.update);
exports.apiRouter.delete("/api/users/logout", userController_1.UserController.logout);
exports.apiRouter.delete("/api/users/current/:username", userController_1.UserController.delete);
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
exports.apiRouter.post("/api/categories", adminMiddleware_1.adminMiddleware, categoryController_1.CategoryController.create);
exports.apiRouter.get("/api/categories", categoryController_1.CategoryController.list);
exports.apiRouter.get("/api/categories/edit/:id", adminMiddleware_1.adminMiddleware, categoryController_1.CategoryController.edit);
exports.apiRouter.put("/api/categories/:id", adminMiddleware_1.adminMiddleware, categoryController_1.CategoryController.update);
exports.apiRouter.delete("/api/categories/:id", adminMiddleware_1.adminMiddleware, categoryController_1.CategoryController.delete);
exports.apiRouter.post("/api/admin/upload", adminMiddleware_1.adminMiddleware, uploadMiddleware_1.upload.single("image"), upload_controller_1.UploadImageController.create);
// Product API
exports.apiRouter.post("/api/products", adminMiddleware_1.adminMiddleware, productController_1.ProductController.create);
exports.apiRouter.get("/api/products", productController_1.ProductController.list);
exports.apiRouter.get("/api/products/:id", productController_1.ProductController.get);
exports.apiRouter.patch("/api/products/:id", adminMiddleware_1.adminMiddleware, productController_1.ProductController.update);
exports.apiRouter.delete("/api/products/:id", adminMiddleware_1.adminMiddleware, productController_1.ProductController.delete);
// Review API
exports.apiRouter.post("/api/reviews", reviewController_1.ReviewController.create);
exports.apiRouter.get("/api/reviews", reviewController_1.ReviewController.getAllReview);
// Blog API (Admin)
exports.apiRouter.post("/api/blogs", adminMiddleware_1.adminMiddleware, blogController_1.BlogController.create);
exports.apiRouter.get("/api/blogs/detail/:id", adminMiddleware_1.adminMiddleware, blogController_1.BlogController.getById);
exports.apiRouter.put("/api/blogs/:id", adminMiddleware_1.adminMiddleware, blogController_1.BlogController.update);
exports.apiRouter.delete("/api/blogs/:id", adminMiddleware_1.adminMiddleware, blogController_1.BlogController.delete);
// Admin Stats API
exports.apiRouter.get("/api/admin/stats", adminMiddleware_1.adminMiddleware, statsController_1.StatsController.get);
// Admin User API
exports.apiRouter.get("/api/admin/users", adminMiddleware_1.adminMiddleware, userController_1.UserController.adminList);
exports.apiRouter.get("/api/admin/users/:username", adminMiddleware_1.adminMiddleware, userController_1.UserController.adminGet);
exports.apiRouter.post("/api/admin/users", adminMiddleware_1.adminMiddleware, userController_1.UserController.adminCreate);
exports.apiRouter.put("/api/admin/users/:username", adminMiddleware_1.adminMiddleware, userController_1.UserController.adminUpdate);
exports.apiRouter.delete("/api/admin/users/:username", adminMiddleware_1.adminMiddleware, userController_1.UserController.adminDelete);
