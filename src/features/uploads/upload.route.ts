import express from "express";
import { UploadImageController } from "./upload.controller";
import { adminMiddleware } from "../../middleware/adminMiddleware";
import { upload } from "../../middleware/uploadMiddleware";

const routerUpload = express.Router();

routerUpload.post("/admin/upload", adminMiddleware, upload.single("image"), UploadImageController.create);

export default routerUpload;
