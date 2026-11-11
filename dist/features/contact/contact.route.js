"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("./contact.controller");
const routerContact = express_1.default.Router();
routerContact.get("/contacts", contact_controller_1.ContactController.search);
routerContact.get("/contacts/:contactId", contact_controller_1.ContactController.get);
routerContact.post("/contacts", contact_controller_1.ContactController.create);
routerContact.put("/contacts/:contactId", contact_controller_1.ContactController.update);
routerContact.delete("/contacts/:contactId", contact_controller_1.ContactController.delete);
exports.default = routerContact;
