"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const user_controller_1 = require("./user.controller");
const routerUsers = express_1.default.Router();
routerUsers.get("/users/current", user_controller_1.UserController.get);
routerUsers.patch("/users/current", user_controller_1.UserController.update);
routerUsers.delete("/users/logout", user_controller_1.UserController.logout);
routerUsers.delete("/users/current/:username", user_controller_1.UserController.delete);
// Current User Contacts
routerUsers.post("/users/current/contacts", user_controller_1.UserController.createMyContact);
routerUsers.put("/users/current/contacts/:contactId", user_controller_1.UserController.updateMyContact);
routerUsers.delete("/users/current/contacts/:contactId", user_controller_1.UserController.deleteMyContact);
// Current User Contact Addresses
routerUsers.post("/users/current/contacts/:contactId/addresses", user_controller_1.UserController.createMyAddress);
routerUsers.put("/users/current/contacts/:contactId/addresses/:addressId", user_controller_1.UserController.updateMyAddress);
routerUsers.delete("/users/current/contacts/:contactId/addresses/:addressId", user_controller_1.UserController.deleteMyAddress);
routerUsers.get("/admin/users", adminMiddleware_1.adminMiddleware, user_controller_1.UserController.adminList);
routerUsers.get("/admin/users/:username", adminMiddleware_1.adminMiddleware, user_controller_1.UserController.adminGet);
routerUsers.post("/admin/users", adminMiddleware_1.adminMiddleware, user_controller_1.UserController.adminCreate);
routerUsers.put("/admin/users/:username", adminMiddleware_1.adminMiddleware, user_controller_1.UserController.adminUpdate);
routerUsers.delete("/admin/users/:username", adminMiddleware_1.adminMiddleware, user_controller_1.UserController.adminDelete);
// Admin User Contacts
routerUsers.post("/admin/users/:username/contacts", adminMiddleware_1.adminMiddleware, user_controller_1.UserController.adminCreateContact);
routerUsers.put("/admin/users/:username/contacts/:contactId", adminMiddleware_1.adminMiddleware, user_controller_1.UserController.adminUpdateContact);
routerUsers.delete("/admin/users/:username/contacts/:contactId", adminMiddleware_1.adminMiddleware, user_controller_1.UserController.adminDeleteContact);
// Admin User Contact Addresses
routerUsers.post("/admin/users/:username/contacts/:contactId/addresses", adminMiddleware_1.adminMiddleware, user_controller_1.UserController.adminCreateAddress);
routerUsers.put("/admin/users/:username/contacts/:contactId/addresses/:addressId", adminMiddleware_1.adminMiddleware, user_controller_1.UserController.adminUpdateAddress);
routerUsers.delete("/admin/users/:username/contacts/:contactId/addresses/:addressId", adminMiddleware_1.adminMiddleware, user_controller_1.UserController.adminDeleteAddress);
exports.default = routerUsers;
