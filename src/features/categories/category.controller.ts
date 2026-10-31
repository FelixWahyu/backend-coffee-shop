import type { Request, Response, NextFunction } from "express";
import { CategoryService } from "./category.service";
import { type CreateCategoryRequest, type UpdateCategoryRequest } from "./category.model";

export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateCategoryRequest = req.body as CreateCategoryRequest;
      const response = await CategoryService.create(request);
      res.status(200).json({
        success: true,
        message: "Create category success.",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const search = typeof req.query.search === "string" ? req.query.search : "";
      const page = req.query.page ? Number(req.query.page) : undefined;
      const size = req.query.size ? Number(req.query.size) : 10;

      const response = await CategoryService.list(search, page, size);
      res.status(200).json({
        success: true,
        message: "Get list categories success.",
        data: response.data,
        paging: response.paging,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await CategoryService.getById(id);
      res.status(200).json({
        success: true,
        message: "Get categories for edit success.",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const request: UpdateCategoryRequest = req.body as UpdateCategoryRequest;
      const response = await CategoryService.update(id, request);
      res.status(200).json({
        success: true,
        message: "Update category success.",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await CategoryService.delete(id);
      res.status(200).json({ data: "Delete category success." });
    } catch (error) {
      next(error);
    }
  }
}
