import type { Request, Response, NextFunction } from "express";
import type { CreateProductRequest, UpdateProductRequest } from "./product.model";
import { ProductService } from "./product.service";
// import { type UpdateProductRequest } from "./product.model";

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateProductRequest = req.body as CreateProductRequest;
      const response = await ProductService.create(request);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const search = typeof req.query.search === "string" ? req.query.search : "";
      const categoryId = req.query.category_id ? Number(req.query.category_id) : undefined;
      const page = req.query.page ? Number(req.query.page) : undefined;
      const size = req.query.size ? Number(req.query.size) : 10;

      const response = await ProductService.list(search, categoryId, page, size);
      res.status(200).json({
        success: true,
        message: "Success get list product",
        data: response.data,
        paging: response.paging,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await ProductService.get(id);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const request: UpdateProductRequest = req.body as UpdateProductRequest;
      const response = await ProductService.update(id, request);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await ProductService.delete(id);
      res.status(200).json({ data: "Berhasil hapus product." });
    } catch (error) {
      next(error);
    }
  }
}
