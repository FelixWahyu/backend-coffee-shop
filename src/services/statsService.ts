import { prismaClient } from "../application/database";

export class StatsService {
  static async getStats() {
    const productsCount = await prismaClient.product.count();
    const categoriesCount = await prismaClient.category.count();
    const usersCount = await prismaClient.user.count();
    const blogsCount = await prismaClient.blogArticle.count();

    return {
      products: productsCount,
      categories: categoriesCount,
      users: usersCount,
      blogs: blogsCount,
    };
  }
}
