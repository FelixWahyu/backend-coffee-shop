"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const contactModel_1 = require("../model/contactModel");
const contactValidation_1 = require("../validation/contactValidation");
const validation_1 = require("../validation/validation");
const database_1 = require("../application/database");
const responseError_1 = require("../error/responseError");
class ContactService {
    static async create(user, request) {
        const contactRequest = validation_1.Validation.validate(contactValidation_1.ContactValidation.CREATE, request);
        const record = {
            ...contactRequest,
            ...{ username: user.username },
        };
        const contact = await database_1.prismaClient.contact.create({
            data: record,
        });
        return (0, contactModel_1.toContactResponse)(contact);
    }
    static async checkContactExist(username, contactId) {
        const contact = await database_1.prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: username,
            },
        });
        if (!contact) {
            throw new responseError_1.ResponseError(404, "Contact not found");
        }
        return contact;
    }
    static async get(user, id) {
        const contact = await this.checkContactExist(user.username, id);
        return (0, contactModel_1.toContactResponse)(contact);
    }
    static async update(user, request) {
        const updateRequest = validation_1.Validation.validate(contactValidation_1.ContactValidation.UPDATE, request);
        await this.checkContactExist(user.username, updateRequest.id);
        const contact = await database_1.prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username,
            },
            data: updateRequest,
        });
        return (0, contactModel_1.toContactResponse)(contact);
    }
    static async delete(user, id) {
        await this.checkContactExist(user.username, id);
        const contact = await database_1.prismaClient.contact.delete({
            where: {
                id: id,
                username: user.username,
            },
        });
        return (0, contactModel_1.toContactResponse)(contact);
    }
    static async search(user, request) {
        const searchRequest = validation_1.Validation.validate(contactValidation_1.ContactValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        if (searchRequest.name) {
            filters.push({
                OR: [
                    {
                        first_name: {
                            contains: searchRequest.name,
                        },
                    },
                    {
                        last_name: {
                            contains: searchRequest.name,
                        },
                    },
                ],
            });
        }
        if (searchRequest.email) {
            filters.push({
                email: {
                    contains: searchRequest.email,
                },
            });
        }
        if (searchRequest.phone) {
            filters.push({
                phone: {
                    contains: searchRequest.phone,
                },
            });
        }
        const contacts = await database_1.prismaClient.contact.findMany({
            where: {
                username: user.username,
                AND: filters,
            },
            skip: skip,
            take: searchRequest.size,
        });
        const total = await database_1.prismaClient.contact.count({
            where: {
                username: user.username,
                AND: filters,
            },
        });
        return {
            data: contacts.map((contact) => (0, contactModel_1.toContactResponse)(contact)),
            paging: {
                size: searchRequest.size,
                total_page: Math.ceil(total / searchRequest.size),
                current_page: searchRequest.page,
            },
        };
    }
}
exports.ContactService = ContactService;
