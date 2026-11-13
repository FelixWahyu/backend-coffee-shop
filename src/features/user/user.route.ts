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

// Admin User Contacts
routerUsers.post("/admin/users/:username/contacts", adminMiddleware, UserController.adminCreateContact);
routerUsers.put("/admin/users/:username/contacts/:contactId", adminMiddleware, UserController.adminUpdateContact);
routerUsers.delete("/admin/users/:username/contacts/:contactId", adminMiddleware, UserController.adminDeleteContact);

// Admin User Contact Addresses
routerUsers.post("/admin/users/:username/contacts/:contactId/addresses", adminMiddleware, UserController.adminCreateAddress);
routerUsers.put("/admin/users/:username/contacts/:contactId/addresses/:addressId", adminMiddleware, UserController.adminUpdateAddress);
routerUsers.delete("/admin/users/:username/contacts/:contactId/addresses/:addressId", adminMiddleware, UserController.adminDeleteAddress);

export default routerUsers;
