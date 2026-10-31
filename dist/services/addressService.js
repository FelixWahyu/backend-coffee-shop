"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const addressModel_1 = require("../model/addressModel");
const validation_1 = require("../validation/validation");
const addressValidation_1 = require("../validation/addressValidation");
const database_1 = require("../application/database");
const contactService_1 = require("./contactService");
const responseError_1 = require("../error/responseError");
class AddressService {
    static async create(user, request) {
        const addressRequest = validation_1.Validation.validate(addressValidation_1.AddressValidation.CREATE, request);
        await contactService_1.ContactService.checkContactExist(user.username, addressRequest.contact_id);
        const address = await database_1.prismaClient.address.create({
            data: addressRequest,
        });
        return (0, addressModel_1.toAddressResponse)(address);
    }
    static async checkAddressExist(contactId, addressId) {
        const address = await database_1.prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId,
            },
        });
        if (!address) {
            throw new responseError_1.ResponseError(404, "Address not found");
        }
        return address;
    }
    static async get(user, request) {
        const addressRequest = validation_1.Validation.validate(addressValidation_1.AddressValidation.GET, request);
        await contactService_1.ContactService.checkContactExist(user.username, request.contact_id);
        const address = await this.checkAddressExist(addressRequest.contact_id, addressRequest.id);
        return (0, addressModel_1.toAddressResponse)(address);
    }
    static async update(user, request) {
        const updateRequest = validation_1.Validation.validate(addressValidation_1.AddressValidation.UPDATE, request);
        await contactService_1.ContactService.checkContactExist(user.username, updateRequest.contact_id);
        await this.checkAddressExist(updateRequest.contact_id, updateRequest.id);
        const address = await database_1.prismaClient.address.update({
            where: {
                id: updateRequest.id,
                contact_id: updateRequest.contact_id,
            },
            data: updateRequest,
        });
        return (0, addressModel_1.toAddressResponse)(address);
    }
    static async delete(user, request) {
        const removeRequest = validation_1.Validation.validate(addressValidation_1.AddressValidation.REMOVE, request);
        await contactService_1.ContactService.checkContactExist(user.username, removeRequest.contact_id);
        await this.checkAddressExist(removeRequest.contact_id, removeRequest.id);
        const address = await database_1.prismaClient.address.delete({
            where: {
                id: removeRequest.id,
                contact_id: removeRequest.contact_id,
            },
        });
        return (0, addressModel_1.toAddressResponse)(address);
    }
    static async list(user, contactId) {
        await contactService_1.ContactService.checkContactExist(user.username, contactId);
        const addresses = await database_1.prismaClient.address.findMany({
            where: {
                contact_id: contactId,
            },
        });
        return addresses.map((address) => (0, addressModel_1.toAddressResponse)(address));
    }
}
exports.AddressService = AddressService;
