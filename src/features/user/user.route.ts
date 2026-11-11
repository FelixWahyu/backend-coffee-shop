import express from "express";
import { adminMiddleware } from "../../middleware/adminMiddleware";
import { UserController } from "./user.controller";

const routerUsers = express.Router();

routerUsers.get("/users/current", UserController.get);
routerUsers.patch("/users/current", UserController.update);
routerUsers.delete("/users/logout", UserController.logout);
routerUsers.delete("/users/current/:username", UserController.delete);

routerUsers.get("/admin/users", adminMiddleware, UserController.adminList);
routerUsers.get("/admin/users/:username", adminMiddleware, UserController.adminGet);
routerUsers.post("/admin/users", adminMiddleware, UserController.adminCreate);
routerUsers.put("/admin/users/:username", adminMiddleware, UserController.adminUpdate);
routerUsers.delete("/admin/users/:username", adminMiddleware, UserController.adminDelete);

export default routerUsers;
