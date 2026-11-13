"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const routerReview = express_1.default.Router();
routerReview.get("/reviews", review_controller_1.ReviewController.getAllReview);
routerReview.post("/reviews", review_controller_1.ReviewController.create);
routerReview.delete("/reviews/:id", review_controller_1.ReviewController.delete);
exports.default = routerReview;
