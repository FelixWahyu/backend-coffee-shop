"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const database_1 = require("../application/database");
const blogModel_1 = require("../model/blogModel");
const blogValidation_1 = require("../validation/blogValidation");
const validation_1 = require("../validation/validation");
const responseError_1 = require("../error/responseError");
const deleteFile_1 = require("../utils/deleteFile");
class BlogService {
    static async create(request) {
        const tagsString = JSON.stringify(request.tags);
        const validated = validation_1.Validation.validate(blogValidation_1.BlogValidation.CREATE, {
            title: request.title,
            excerpt: request.excerpt,
            content: request.content,
            image: request.image,
            category: request.category,
            author: request.author,
            tags: tagsString,
            readingTime: request.readingTime,
        });
        const slug = (0, blogModel_1.slugify)(validated.title);
        const existingSlug = await database_1.prismaClient.blogArticle.findUnique({
            where: { slug },
        });
        if (existingSlug) {
            throw new responseError_1.ResponseError(400, "Article with this title already exists");
        }
        const article = await database_1.prismaClient.blogArticle.create({
            data: {
                ...validated,
                slug,
            },
        });
        return (0, blogModel_1.toBlogResponse)(article);
    }
    static async list(search, page, size = 10) {
        const where = search
            ? {
                OR: [
                    { title: { contains: search } },
                    { excerpt: { contains: search } },
                    { category: { contains: search } },
                ],
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
        const articles = await database_1.prismaClient.blogArticle.findMany(queryOptions);
        if (page !== undefined) {
            const total = await database_1.prismaClient.blogArticle.count({
                where,
            });
            return {
                data: articles.map((article) => (0, blogModel_1.toBlogResponse)(article)),
                paging: {
                    size,
                    total_page: Math.ceil(total / size),
                    current_page: page,
                },
            };
        }
        return {
            data: articles.map((article) => (0, blogModel_1.toBlogResponse)(article)),
        };
    }
    static async getBySlug(slug) {
        const article = await database_1.prismaClient.blogArticle.findUnique({
            where: { slug },
        });
        if (!article) {
            throw new responseError_1.ResponseError(404, "Article not found");
        }
        return (0, blogModel_1.toBlogResponse)(article);
    }
    static async getById(id) {
        const article = await database_1.prismaClient.blogArticle.findUnique({
            where: { id },
        });
        if (!article) {
            throw new responseError_1.ResponseError(404, "Article not found");
        }
        return (0, blogModel_1.toBlogResponse)(article);
    }
    static async update(id, request) {
        const updateRequest = validation_1.Validation.validate(blogValidation_1.BlogValidation.UPDATE, {
            ...request,
            tags: request.tags ? JSON.stringify(request.tags) : undefined,
        });
        const existing = await database_1.prismaClient.blogArticle.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new responseError_1.ResponseError(404, "Article not found");
        }
        const data = {};
        if (updateRequest.title !== undefined) {
            data.title = updateRequest.title;
            data.slug = (0, blogModel_1.slugify)(updateRequest.title);
            const slugExists = await database_1.prismaClient.blogArticle.findUnique({
                where: { slug: data.slug },
            });
            if (slugExists && slugExists.id !== id) {
                throw new responseError_1.ResponseError(400, "Another article with this title already exists");
            }
        }
        if (updateRequest.excerpt !== undefined)
            data.excerpt = updateRequest.excerpt;
        if (updateRequest.content !== undefined)
            data.content = updateRequest.content;
        if (updateRequest.image !== undefined)
            data.image = updateRequest.image;
        if (updateRequest.category !== undefined)
            data.category = updateRequest.category;
        if (updateRequest.author !== undefined)
            data.author = updateRequest.author;
        if (updateRequest.tags !== undefined)
            data.tags = updateRequest.tags;
        if (updateRequest.readingTime !== undefined)
            data.readingTime = updateRequest.readingTime;
        const article = await database_1.prismaClient.blogArticle.update({
            where: { id },
            data,
        });
        if (updateRequest.image !== undefined && existing.image && existing.image !== updateRequest.image) {
            (0, deleteFile_1.deleteFile)(existing.image);
        }
        return (0, blogModel_1.toBlogResponse)(article);
    }
    static async delete(id) {
        const existing = await database_1.prismaClient.blogArticle.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new responseError_1.ResponseError(404, "Article not found");
        }
        await database_1.prismaClient.blogArticle.delete({
            where: { id },
        });
        if (existing.image) {
            (0, deleteFile_1.deleteFile)(existing.image);
        }
    }
}
exports.BlogService = BlogService;
