import type { Request, Response, NextFunction } from "express";
import { BlogService } from "../services/blogService";

export class BlogController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request = {
        title: req.body.title,
        excerpt: req.body.excerpt,
        content: req.body.content,
        image: req.body.image,
        category: req.body.category,
        author: req.body.author,
        tags: req.body.tags,
        readingTime: Number(req.body.readingTime),
      };
      const response = await BlogService.create(request);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const search = typeof req.query.search === "string" ? req.query.search : "";
      const page = req.query.page ? Number(req.query.page) : undefined;
      const size = req.query.size ? Number(req.query.size) : 10;
      
      const response = await BlogService.list(search, page, size);
      res.status(200).json({
        success: true,
        message: "Success get list articles",
        data: response.data,
        paging: response.paging,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug as string;
      const response = await BlogService.getBySlug(slug);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await BlogService.getById(id);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const request: Record<string, unknown> = {};
      if (req.body.title !== undefined) request.title = req.body.title;
      if (req.body.excerpt !== undefined) request.excerpt = req.body.excerpt;
      if (req.body.content !== undefined) request.content = req.body.content;
      if (req.body.image !== undefined) request.image = req.body.image;
      if (req.body.category !== undefined) request.category = req.body.category;
      if (req.body.author !== undefined) request.author = req.body.author;
      if (req.body.tags !== undefined) request.tags = req.body.tags;
      if (req.body.readingTime !== undefined) request.readingTime = Number(req.body.readingTime);
      const response = await BlogService.update(id, request as any);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await BlogService.delete(id);
      res.status(200).json({ data: "Berhasil hapus article." });
    } catch (error) {
      next(error);
    }
  }
}
