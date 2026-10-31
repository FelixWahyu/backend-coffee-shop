"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
class CategoryController {
    static async create(req, res, next) {
        try {
            const request = req.body;
            const response = await category_service_1.CategoryService.create(request);
            res.status(200).json({
                success: true,
                message: "Create category success.",
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async list(req, res, next) {
        try {
            const search = typeof req.query.search === "string" ? req.query.search : "";
            const page = req.query.page ? Number(req.query.page) : undefined;
            const size = req.query.size ? Number(req.query.size) : 10;
            const response = await category_service_1.CategoryService.list(search, page, size);
            res.status(200).json({
                success: true,
                message: "Get list categories success.",
                data: response.data,
                paging: response.paging,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async edit(req, res, next) {
        try {
            const id = Number(req.params.id);
            const response = await category_service_1.CategoryService.getById(id);
            res.status(200).json({
                success: true,
                message: "Get categories for edit success.",
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const request = req.body;
            const response = await category_service_1.CategoryService.update(id, request);
            res.status(200).json({
                success: true,
                message: "Update category success.",
                data: response,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            await category_service_1.CategoryService.delete(id);
            res.status(200).json({ data: "Delete category success." });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CategoryController = CategoryController;
