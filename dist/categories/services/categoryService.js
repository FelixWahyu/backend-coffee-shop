"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const categoryModel_1 = require("../model/categoryModel");
const validation_1 = require("../../validation/validation");
const categoryValidation_1 = require("../validation/categoryValidation");
const database_1 = require("../../application/database");
const responseError_1 = require("../../error/responseError");
const deleteFile_1 = require("../../utils/deleteFile");
class CategoryService {
    static async create(request) {
        const createRequest = validation_1.Validation.validate(categoryValidation_1.CategoryValidation.CREATE, request);
        const category = await database_1.prismaClient.category.create({
            data: createRequest,
        });
        return (0, categoryModel_1.toCategoryResponse)(category);
    }
    static async list(search, page, size = 10) {
        const where = search
            ? {
                OR: [{ name: { contains: search } }],
            }
            : {};
        const queryOptions = {
            where,
            orderBy: { createdAt: "desc" },
        };
        if (page !== undefined) {
            queryOptions.skip = (page - 1) * size;
            queryOptions.take = size;
        }
        const categories = await database_1.prismaClient.category.findMany(queryOptions);
        if (page !== undefined) {
            const total = await database_1.prismaClient.category.count({
                where,
            });
            return {
                data: categories.map((category) => (0, categoryModel_1.toCategoryResponse)(category)),
                paging: {
                    size,
                    total_page: Math.ceil(total / size),
                    current_page: page,
                },
            };
        }
        return {
            data: categories.map((category) => (0, categoryModel_1.toCategoryResponse)(category)),
        };
    }
    static async getById(id) {
        const category = await database_1.prismaClient.category.findUnique({
            where: { id },
        });
        if (!category)
            throw new responseError_1.ResponseError(404, "Category not found.");
        return (0, categoryModel_1.toCategoryResponse)(category);
    }
    static async update(id, request) {
        const updateRequest = validation_1.Validation.validate(categoryValidation_1.CategoryValidation.UPDATE, request);
        const isExist = await database_1.prismaClient.category.findUnique({
            where: {
                id: id,
            },
        });
        if (!isExist) {
            throw new responseError_1.ResponseError(404, "Category not found");
        }
        const category = await database_1.prismaClient.category.update({
            where: {
                id: id,
            },
            data: updateRequest,
        });
        if (updateRequest.image !== undefined && isExist.image && isExist.image !== updateRequest.image) {
            (0, deleteFile_1.deleteFile)(isExist.image);
        }
        return (0, categoryModel_1.toCategoryResponse)(category);
    }
    static async delete(id) {
        const isExistCategory = await database_1.prismaClient.category.findFirst({
            where: {
                id: id,
            },
        });
        if (!isExistCategory) {
            throw new responseError_1.ResponseError(404, "Category is not found.");
        }
        const category = await database_1.prismaClient.category.delete({
            where: {
                id: id,
            },
        });
        if (category.image) {
            (0, deleteFile_1.deleteFile)(category.image);
        }
        return (0, categoryModel_1.toCategoryResponse)(category);
    }
}
exports.CategoryService = CategoryService;
