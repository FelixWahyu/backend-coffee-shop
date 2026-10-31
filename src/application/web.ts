import express from "express";
import publicRouter from "../routes/publicApi";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { apiRouter } from "../routes/api";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./cors";

if (!process.env.BASE_FRONTEND_API_URL) {
  throw new Error("BASE_FRONTEND_API_URL is not defined");
}

export const web = express();
web.use(cors(corsOptions));
web.use(cookieParser());
web.use(express.json());
web.use("/public", express.static("public"));
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);
