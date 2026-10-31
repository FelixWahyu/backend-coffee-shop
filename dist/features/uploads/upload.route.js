"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_controller_1 = require("./upload.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const uploadMiddleware_1 = require("../../middleware/uploadMiddleware");
const routerUpload = express_1.default.Router();
routerUpload.post("/admin/upload", authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, uploadMiddleware_1.upload.single("image"), upload_controller_1.UploadImageController.create);
exports.default = routerUpload;
