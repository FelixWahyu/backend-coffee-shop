"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBlogResponse = toBlogResponse;
exports.slugify = slugify;
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}
function toBlogResponse(article) {
    return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
        category: article.category,
        author: article.author,
        tags: JSON.parse(article.tags),
        readingTime: article.readingTime,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
    };
}
