"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const database_1 = require("../application/database");
class StatsService {
    static async getStats() {
        const productsCount = await database_1.prismaClient.product.count();
        const categoriesCount = await database_1.prismaClient.category.count();
        const usersCount = await database_1.prismaClient.user.count();
        const blogsCount = await database_1.prismaClient.blogArticle.count();
        return {
            products: productsCount,
            categories: categoriesCount,
            users: usersCount,
            blogs: blogsCount,
        };
    }
}
exports.StatsService = StatsService;
