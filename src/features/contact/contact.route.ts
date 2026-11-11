import express from "express";
import { ContactController } from "./contact.controller";

const routerContact = express.Router();

routerContact.get("/contacts", ContactController.search);
routerContact.get("/contacts/:contactId", ContactController.get);
routerContact.post("/contacts", ContactController.create);
routerContact.put("/contacts/:contactId", ContactController.update);
routerContact.delete("/contacts/:contactId", ContactController.delete);

export default routerContact;
