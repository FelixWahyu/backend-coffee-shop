"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productService_1 = require("../services/productService");
class ProductController {
    static async create(req, res, next) {
        try {
            const request = req.body;
            const response = await productService_1.ProductService.create(request);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async list(req, res, next) {
        try {
            const search = typeof req.query.search === "string" ? req.query.search : "";
            const categoryId = req.query.category_id ? Number(req.query.category_id) : undefined;
            const page = req.query.page ? Number(req.query.page) : undefined;
            const size = req.query.size ? Number(req.query.size) : 10;
            const response = await productService_1.ProductService.list(search, categoryId, page, size);
            res.status(200).json({
                success: true,
                message: "Success get list product",
                data: response.data,
                paging: response.paging,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async get(req, res, next) {
        try {
            const id = Number(req.params.id);
            const response = await productService_1.ProductService.get(id);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const request = req.body;
            const response = await productService_1.ProductService.update(id, request);
            res.status(200).json({ data: response });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            await productService_1.ProductService.delete(id);
            res.status(200).json({ data: "Berhasil hapus product." });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductController = ProductController;
