"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    static async register(req, res, next) {
        try {
            const request = req.body;
            const response = await userService_1.UserService.register(request);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const request = req.body;
            const response = await userService_1.UserService.login(request);
            const { token, ...userData } = response;
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({
                message: "Berhasil Login",
                data: userData,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async get(req, res, next) {
        try {
            const response = await userService_1.UserService.get(req.user);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const request = req.body;
            const response = await userService_1.UserService.update(req.user, request);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async logout(req, res, next) {
        try {
            await userService_1.UserService.logout(req.user);
            res.clearCookie("token");
            res.status(200).json({ message: "Berhasil Logout" });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const username = String(req.params.username);
            await userService_1.UserService.delete(username);
            res.status(200).json({ data: "Berhasil hapus user." });
        }
        catch (error) {
            next(error);
        }
    }
    static async adminList(req, res, next) {
        try {
            const search = typeof req.query.search === "string" ? req.query.search : undefined;
            const page = req.query.page ? Number(req.query.page) : 1;
            const size = req.query.size ? Number(req.query.size) : 10;
            const response = await userService_1.UserService.list(search, page, size);
            res.status(200).json({
                success: true,
                message: "Get users success",
                data: response.data,
                paging: response.paging,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async adminGet(req, res, next) {
        try {
            const username = String(req.params.username);
            const response = await userService_1.UserService.getByUsername(username);
            res.status(200).json({
                success: true,
                message: "Get user success",
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async adminCreate(req, res, next) {
        try {
            const request = req.body;
            const response = await userService_1.UserService.createByAdmin(request);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async adminUpdate(req, res, next) {
        try {
            const username = String(req.params.username);
            const request = req.body;
            const response = await userService_1.UserService.updateByAdmin(username, request);
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async adminDelete(req, res, next) {
        try {
            const username = String(req.params.username);
            const currentAdminUsername = req.user.username;
            const response = await userService_1.UserService.deleteByAdmin(username, currentAdminUsername);
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
