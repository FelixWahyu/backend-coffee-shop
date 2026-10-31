"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const database_1 = require("../application/database");
const productModel_1 = require("../model/productModel");
const productValidation_1 = require("../validation/productValidation");
const validation_1 = require("../validation/validation");
const responseError_1 = require("../error/responseError");
const deleteFile_1 = require("../utils/deleteFile");
class ProductService {
    static async create(request) {
        const createRequest = validation_1.Validation.validate(productValidation_1.ProductValidation.CREATE, request);
        const isCheckCategory = await database_1.prismaClient.category.findUnique({
            where: {
                id: createRequest.category_id,
            },
        });
        if (!isCheckCategory) {
            throw new responseError_1.ResponseError(404, "Category not found");
        }
        const product = await database_1.prismaClient.product.create({
            data: {
                name: createRequest.name,
                description: createRequest.description ?? null,
                price: createRequest.price,
                image: createRequest.image ?? null,
                category: {
                    connect: {
                        id: createRequest.category_id,
                    },
                },
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return (0, productModel_1.toProductResponse)(product);
    }
    static async list(search, categoryId, page, size = 10) {
        const whereClause = {};
        if (search) {
            whereClause.OR = [
                {
                    name: {
                        contains: search.toLowerCase(),
                    },
                },
                {
                    category: {
                        name: {
                            contains: search.toLowerCase(),
                        },
                    },
                },
            ];
        }
        if (categoryId) {
            whereClause.category_id = categoryId;
        }
        const products = await database_1.prismaClient.product.findMany({
            where: whereClause,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            ...(page !== undefined ? {
                skip: (page - 1) * size,
                take: size,
            } : {}),
        });
        if (page !== undefined) {
            const total = await database_1.prismaClient.product.count({
                where: whereClause,
            });
            return {
                data: products.map((product) => (0, productModel_1.toProductResponse)(product)),
                paging: {
                    size,
                    total_page: Math.ceil(total / size),
                    current_page: page,
                },
            };
        }
        return {
            data: products.map((product) => (0, productModel_1.toProductResponse)(product)),
        };
    }
    static async get(id) {
        const product = await database_1.prismaClient.product.findUnique({
            where: {
                id: id,
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (!product) {
            throw new responseError_1.ResponseError(404, "Product not found");
        }
        return (0, productModel_1.toProductResponse)(product);
    }
    static async update(id, request) {
        const updateRequest = validation_1.Validation.validate(productValidation_1.ProductValidation.UPDATE, request);
        const existing = await database_1.prismaClient.product.findUnique({
            where: {
                id: id,
            },
        });
        if (!existing) {
            throw new responseError_1.ResponseError(404, "Product not found");
        }
        const data = {};
        if (updateRequest.image !== undefined) {
            data.image = updateRequest.image;
        }
        if (updateRequest.name !== undefined) {
            data.name = updateRequest.name;
        }
        if (updateRequest.description !== undefined) {
            data.description = updateRequest.description;
        }
        if (updateRequest.price !== undefined) {
            data.price = updateRequest.price;
        }
        if (updateRequest.category_id !== undefined) {
            const isCheckCategory = await database_1.prismaClient.category.findUnique({
                where: {
                    id: updateRequest.category_id,
                },
            });
            if (!isCheckCategory) {
                throw new responseError_1.ResponseError(404, "Category not found");
            }
            data.category = {
                connect: {
                    id: updateRequest.category_id,
                },
            };
        }
        const product = await database_1.prismaClient.product.update({
            where: {
                id: id,
            },
            data,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (updateRequest.image !== undefined && existing.image && existing.image !== updateRequest.image) {
            (0, deleteFile_1.deleteFile)(existing.image);
        }
        return (0, productModel_1.toProductResponse)(product);
    }
    static async delete(id) {
        const product = await database_1.prismaClient.product.delete({
            where: {
                id: id,
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (product.image) {
            (0, deleteFile_1.deleteFile)(product.image);
        }
        return (0, productModel_1.toProductResponse)(product);
    }
}
exports.ProductService = ProductService;
