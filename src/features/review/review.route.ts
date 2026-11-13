import express from "express";
import { ReviewController } from "./review.controller";

const routerReview = express.Router();

routerReview.get("/reviews", ReviewController.getAllReview);
routerReview.post("/reviews", ReviewController.create);
routerReview.delete("/reviews/:id", ReviewController.delete);

export default routerReview;
