import express from "express";
import { AddressController } from "./address.controller";

const routerAddress = express.Router();

routerAddress.get("/contacts/:contactId/addresses", AddressController.list);
routerAddress.get("/contacts/:contactId/addresses/:addressId", AddressController.get);
routerAddress.post("/contacts/:contactId/addresses", AddressController.create);
routerAddress.put("/contacts/:contactId/addresses/:addressId", AddressController.update);
routerAddress.delete("/contacts/:contactId/addresses/:addressId", AddressController.delete);

export default routerAddress;
