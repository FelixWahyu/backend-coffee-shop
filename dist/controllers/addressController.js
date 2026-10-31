"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const addressService_1 = require("../services/addressService");
class AddressController {
    static async create(req, res, next) {
        try {
            const request = req.body;
            request.contact_id = Number(req.params.contactId);
            const response = await addressService_1.AddressService.create(req.user, request);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async get(req, res, next) {
        try {
            const request = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId),
            };
            const response = await addressService_1.AddressService.get(req.user, request);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const request = req.body;
            request.contact_id = Number(req.params.contactId);
            request.id = Number(req.params.addressId);
            const response = await addressService_1.AddressService.update(req.user, request);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const request = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId),
            };
            await addressService_1.AddressService.delete(req.user, request);
            res.status(200).json({ data: "OK" });
        }
        catch (error) {
            next(error);
        }
    }
    static async list(req, res, next) {
        try {
            const contactId = Number(req.params.contactId);
            const response = await addressService_1.AddressService.list(req.user, contactId);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AddressController = AddressController;
