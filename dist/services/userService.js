"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../application/database");
const responseError_1 = require("../error/responseError");
const userModel_1 = require("../model/userModel");
const userValidation_1 = require("../validation/userValidation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    static async register(request) {
        const registerRequest = validation_1.Validation.validate(userValidation_1.UserValidation.REGISTER, request);
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
        return (0, userModel_1.toUserResponse)(user);
    }
    static async login(request) {
        const loginRequest = validation_1.Validation.validate(userValidation_1.UserValidation.LOGIN, request);
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
        const response = (0, userModel_1.toUserResponse)(user);
        response.token = user.token;
        return response;
    }
    static async get(user) {
        return (0, userModel_1.toUserResponse)(user);
    }
    static async update(user, request) {
        const updateRequest = validation_1.Validation.validate(userValidation_1.UserValidation.UPDATE, request);
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
        return (0, userModel_1.toUserResponse)(result);
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
        return (0, userModel_1.toUserResponse)(result);
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
        return (0, userModel_1.toUserResponse)(result);
    }
    static async list(search, page = 1, size = 10) {
        const whereClause = {};
        if (search) {
            whereClause.OR = [
                { username: { contains: search } },
                { name: { contains: search } },
            ];
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
            data: users.map(userModel_1.toUserResponse),
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
        });
        if (!user) {
            throw new responseError_1.ResponseError(404, "User not found");
        }
        return (0, userModel_1.toUserResponse)(user);
    }
    static async createByAdmin(request) {
        const createRequest = validation_1.Validation.validate(userValidation_1.UserValidation.ADMIN_CREATE, request);
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
        return (0, userModel_1.toUserResponse)(user);
    }
    static async updateByAdmin(username, request) {
        const updateRequest = validation_1.Validation.validate(userValidation_1.UserValidation.ADMIN_UPDATE, request);
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
        return (0, userModel_1.toUserResponse)(updatedUser);
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
        return (0, userModel_1.toUserResponse)(deletedUser);
    }
}
exports.UserService = UserService;
