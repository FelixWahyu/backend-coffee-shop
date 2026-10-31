"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contactService_1 = require("../services/contactService");
const zod_1 = require("zod");
const getContactSchema = zod_1.z.object({
    contactId: zod_1.z.string().regex(/^\d+$/),
});
class ContactController {
    static async create(req, res, next) {
        try {
            const request = req.body;
            const response = await contactService_1.ContactService.create(req.user, request);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async get(req, res, next) {
        try {
            const validate = getContactSchema.parse(req.params);
            const contactId = Number(validate.contactId);
            const response = await contactService_1.ContactService.get(req.user, contactId);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const request = req.body;
            const validate = getContactSchema.parse(req.params);
            request.id = Number(validate.contactId);
            const response = await contactService_1.ContactService.update(req.user, request);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const validate = getContactSchema.parse(req.params);
            const contactId = Number(validate.contactId);
            await contactService_1.ContactService.delete(req.user, contactId);
            res.status(200).json({ data: "OK" });
        }
        catch (error) {
            next(error);
        }
    }
    static async search(req, res, next) {
        try {
            const request = {
                name: req.query.name,
                email: req.query.email,
                phone: req.query.phone,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            };
            const response = await contactService_1.ContactService.search(req.user, request);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ContactController = ContactController;
