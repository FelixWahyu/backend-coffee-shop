"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../../application/database");
const responseError_1 = require("../../error/responseError");
const user_model_1 = require("./user.model");
const user_validation_1 = require("./user.validation");
const validation_1 = require("../../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    static async register(request) {
        const registerRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
        const totalUserSameUsername = await database_1.prismaClient.user.count({
            where: {
                username: registerRequest.username,
            },
        });
        if (totalUserSameUsername != 0) {
            throw new responseError_1.ResponseError(400, "Username already exists");
        }
        registerRequest.password = await bcrypt_1.default.hash(registerRequest.password, 10);
        const user = await database_1.prismaClient.user.create({
            data: registerRequest,
        });
        return (0, user_model_1.toUserResponse)(user);
    }
    static async login(request) {
        const loginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
        let user = await database_1.prismaClient.user.findUnique({
            where: {
                username: loginRequest.username,
            },
        });
        if (!user) {
            throw new responseError_1.ResponseError(401, "Username or Password is wrong");
        }
        const isPasswordValid = await bcrypt_1.default.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new responseError_1.ResponseError(401, "Username or Password is wrong");
        }
        user = await database_1.prismaClient.user.update({
            where: {
                username: loginRequest.username,
            },
            data: {
                token: (0, uuid_1.v4)(),
            },
        });
        const response = (0, user_model_1.toUserResponse)(user);
        response.token = user.token;
        return response;
    }
    static async get(user) {
        return (0, user_model_1.toUserResponse)(user);
    }
    static async update(user, request) {
        const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
        if (updateRequest.name) {
            user.name = updateRequest.name;
        }
        if (updateRequest.password) {
            user.password = await bcrypt_1.default.hash(updateRequest.password, 10);
        }
        const result = await database_1.prismaClient.user.update({
            where: {
                username: user.username,
            },
            data: user,
        });
        return (0, user_model_1.toUserResponse)(result);
    }
    static async logout(user) {
        const result = await database_1.prismaClient.user.update({
            where: {
                username: user.username,
            },
            data: {
                token: null,
            },
        });
        return (0, user_model_1.toUserResponse)(result);
    }
    static async delete(username) {
        const isUserExist = await database_1.prismaClient.user.findFirst({
            where: {
                username: username,
            },
        });
        if (!isUserExist) {
            throw new responseError_1.ResponseError(404, "User not found");
        }
        const result = await database_1.prismaClient.user.delete({
            where: {
                username: username,
            },
        });
        return (0, user_model_1.toUserResponse)(result);
    }
    static async list(search, page = 1, size = 10) {
        const whereClause = {};
        if (search) {
            whereClause.OR = [{ username: { contains: search } }, { name: { contains: search } }];
        }
        const skip = (page - 1) * size;
        const [users, total] = await Promise.all([
            database_1.prismaClient.user.findMany({
                where: whereClause,
                skip,
                take: size,
                orderBy: { username: "asc" },
            }),
            database_1.prismaClient.user.count({
                where: whereClause,
            }),
        ]);
        return {
            data: users.map(user_model_1.toUserResponse),
            paging: {
                size,
                total_page: Math.ceil(total / size) || 1,
                current_page: page,
            },
        };
    }
    static async getByUsername(username) {
        const user = await database_1.prismaClient.user.findUnique({
            where: { username },
            include: {
                contacts: {
                    include: {
                        addresses: true,
                    },
                },
            },
        });
        if (!user) {
            throw new responseError_1.ResponseError(404, "User not found");
        }
        return (0, user_model_1.toUserDetailResponse)(user);
    }
    static async createByAdmin(request) {
        const createRequest = validation_1.Validation.validate(user_validation_1.UserValidation.ADMIN_CREATE, request);
        const isExist = await database_1.prismaClient.user.findUnique({
            where: { username: createRequest.username },
        });
        if (isExist) {
            throw new responseError_1.ResponseError(400, "Username already exists");
        }
        const hashedPassword = await bcrypt_1.default.hash(createRequest.password, 10);
        const user = await database_1.prismaClient.user.create({
            data: {
                username: createRequest.username,
                name: createRequest.name,
                password: hashedPassword,
                role: createRequest.role,
            },
        });
        return (0, user_model_1.toUserResponse)(user);
    }
    static async updateByAdmin(username, request) {
        const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.ADMIN_UPDATE, request);
        const user = await database_1.prismaClient.user.findUnique({
            where: { username },
        });
        if (!user) {
            throw new responseError_1.ResponseError(404, "User not found");
        }
        const dataToUpdate = {};
        if (updateRequest.name) {
            dataToUpdate.name = updateRequest.name;
        }
        if (updateRequest.role) {
            dataToUpdate.role = updateRequest.role;
        }
        if (updateRequest.password && updateRequest.password.trim() !== "") {
            dataToUpdate.password = await bcrypt_1.default.hash(updateRequest.password, 10);
        }
        const updatedUser = await database_1.prismaClient.user.update({
            where: { username },
            data: dataToUpdate,
        });
        return (0, user_model_1.toUserResponse)(updatedUser);
    }
    static async deleteByAdmin(username, currentAdminUsername) {
        if (username === currentAdminUsername) {
            throw new responseError_1.ResponseError(400, "Cannot delete your own admin account");
        }
        const user = await database_1.prismaClient.user.findUnique({
            where: { username },
        });
        if (!user) {
            throw new responseError_1.ResponseError(404, "User not found");
        }
        await database_1.prismaClient.review.deleteMany({
            where: { username },
        });
        const contacts = await database_1.prismaClient.contact.findMany({
            where: { username },
            select: { id: true },
        });
        const contactIds = contacts.map((c) => c.id);
        if (contactIds.length > 0) {
            await database_1.prismaClient.address.deleteMany({
                where: { contact_id: { in: contactIds } },
            });
            await database_1.prismaClient.contact.deleteMany({
                where: { username },
            });
        }
        const deletedUser = await database_1.prismaClient.user.delete({
            where: { username },
        });
        return (0, user_model_1.toUserResponse)(deletedUser);
    }
    static async createContact(username, request) {
        const validated = validation_1.Validation.validate(user_validation_1.UserValidation.CONTACT_CREATE, request);
        const user = await database_1.prismaClient.user.findUnique({
            where: { username },
        });
        if (!user) {
            throw new responseError_1.ResponseError(404, "User not found");
        }
        const { address, ...contactData } = validated;
        const contact = await database_1.prismaClient.contact.create({
            data: {
                first_name: contactData.first_name,
                last_name: contactData.last_name,
                email: contactData.email || null,
                phone: contactData.phone || null,
                username: username,
                addresses: address
                    ? {
                        create: {
                            street: address.street || null,
                            city: address.city,
                            province: address.province,
                            country: address.country || null,
                            postal_code: address.postal_code || null,
                        },
                    }
                    : undefined,
            },
            include: {
                addresses: true,
            },
        });
        return {
            id: contact.id,
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone,
            username: contact.username,
            addresses: contact.addresses.map((a) => ({
                id: a.id,
                street: a.street,
                city: a.city,
                province: a.province,
                country: a.country,
                postal_code: a.postal_code,
                contact_id: a.contact_id,
            })),
        };
    }
    static async updateContact(username, contactId, request) {
        const validated = validation_1.Validation.validate(user_validation_1.UserValidation.CONTACT_UPDATE, request);
        const existing = await database_1.prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: username,
            },
        });
        if (!existing) {
            throw new responseError_1.ResponseError(404, "Contact not found");
        }
        const updated = await database_1.prismaClient.contact.update({
            where: { id: contactId },
            data: {
                first_name: validated.first_name ?? existing.first_name,
                last_name: validated.last_name ?? existing.last_name,
                email: validated.email !== undefined ? validated.email || null : existing.email,
                phone: validated.phone !== undefined ? validated.phone || null : existing.phone,
            },
            include: {
                addresses: true,
            },
        });
        return {
            id: updated.id,
            first_name: updated.first_name,
            last_name: updated.last_name,
            email: updated.email,
            phone: updated.phone,
            username: updated.username,
            addresses: updated.addresses.map((a) => ({
                id: a.id,
                street: a.street,
                city: a.city,
                province: a.province,
                country: a.country,
                postal_code: a.postal_code,
                contact_id: a.contact_id,
            })),
        };
    }
    static async deleteContact(username, contactId) {
        const existing = await database_1.prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: username,
            },
        });
        if (!existing) {
            throw new responseError_1.ResponseError(404, "Contact not found");
        }
        await database_1.prismaClient.$transaction([
            database_1.prismaClient.address.deleteMany({ where: { contact_id: contactId } }),
            database_1.prismaClient.contact.delete({ where: { id: contactId } }),
        ]);
    }
    static async createAddress(username, contactId, request) {
        const validated = validation_1.Validation.validate(user_validation_1.UserValidation.ADDRESS_CREATE, request);
        const contact = await database_1.prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: username,
            },
        });
        if (!contact) {
            throw new responseError_1.ResponseError(404, "Contact not found");
        }
        const address = await database_1.prismaClient.address.create({
            data: {
                contact_id: contactId,
                street: validated.street || null,
                city: validated.city,
                province: validated.province,
                country: validated.country || null,
                postal_code: validated.postal_code || null,
            },
        });
        return {
            id: address.id,
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code,
            contact_id: address.contact_id,
        };
    }
    static async updateAddress(username, contactId, addressId, request) {
        const validated = validation_1.Validation.validate(user_validation_1.UserValidation.ADDRESS_UPDATE, request);
        const contact = await database_1.prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: username,
            },
        });
        if (!contact) {
            throw new responseError_1.ResponseError(404, "Contact not found");
        }
        const existingAddress = await database_1.prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId,
            },
        });
        if (!existingAddress) {
            throw new responseError_1.ResponseError(404, "Address not found");
        }
        const updated = await database_1.prismaClient.address.update({
            where: { id: addressId },
            data: {
                street: validated.street !== undefined ? validated.street || null : existingAddress.street,
                city: validated.city ?? existingAddress.city,
                province: validated.province ?? existingAddress.province,
                country: validated.country !== undefined ? validated.country || null : existingAddress.country,
                postal_code: validated.postal_code !== undefined ? validated.postal_code || null : existingAddress.postal_code,
            },
        });
        return {
            id: updated.id,
            street: updated.street,
            city: updated.city,
            province: updated.province,
            country: updated.country,
            postal_code: updated.postal_code,
            contact_id: updated.contact_id,
        };
    }
    static async deleteAddress(username, contactId, addressId) {
        const contact = await database_1.prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: username,
            },
        });
        if (!contact) {
            throw new responseError_1.ResponseError(404, "Contact not found");
        }
        const existingAddress = await database_1.prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId,
            },
        });
        if (!existingAddress) {
            throw new responseError_1.ResponseError(404, "Address not found");
        }
        await database_1.prismaClient.address.delete({
            where: { id: addressId },
        });
    }
}
exports.UserService = UserService;
