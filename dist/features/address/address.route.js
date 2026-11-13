"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const address_controller_1 = require("./address.controller");
const routerAddress = express_1.default.Router();
routerAddress.get("/contacts/:contactId/addresses", address_controller_1.AddressController.list);
routerAddress.get("/contacts/:contactId/addresses/:addressId", address_controller_1.AddressController.get);
routerAddress.post("/contacts/:contactId/addresses", address_controller_1.AddressController.create);
routerAddress.put("/contacts/:contactId/addresses/:addressId", address_controller_1.AddressController.update);
routerAddress.delete("/contacts/:contactId/addresses/:addressId", address_controller_1.AddressController.delete);
exports.default = routerAddress;
