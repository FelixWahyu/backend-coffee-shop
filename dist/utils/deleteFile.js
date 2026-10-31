"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = deleteFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function deleteFile(fileUrl) {
    if (!fileUrl)
        return;
    // e.g., "/public/uploads/images/1721590000000-filename.jpg" -> "public/uploads/images/1721590000000-filename.jpg"
    const relativePath = fileUrl.startsWith("/") ? fileUrl.substring(1) : fileUrl;
    const absolutePath = path_1.default.join(process.cwd(), relativePath);
    fs_1.default.unlink(absolutePath, (err) => {
        if (err) {
            console.error(`Failed to delete file at ${absolutePath}:`, err.message);
        }
        else {
            console.log(`Successfully deleted file at ${absolutePath}`);
        }
    });
}
