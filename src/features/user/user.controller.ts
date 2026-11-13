import type { NextFunction, Request, Response } from "express";
import type { CreateUserRequest, LoginUserRequest, UpdateUserRequest, CreateAdminUserRequest, UpdateAdminUserRequest } from "./user.model";
import { UserService } from "./user.service";
import type { UserRequest } from "../../type/userRequest";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await UserService.login(request);
      const { token, ...userData } = response;
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "Berhasil Login",
        data: userData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.get(req.user!);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(req.user!, request);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await UserService.logout(req.user!);
      res.clearCookie("token");
      res.status(200).json({ message: "Berhasil Logout" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const username = String(req.params.username);
      await UserService.delete(username);
      res.status(200).json({ data: "Berhasil hapus user." });
    } catch (error) {
      next(error);
    }
  }

  static async adminList(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const search = typeof req.query.search === "string" ? req.query.search : undefined;
      const page = req.query.page ? Number(req.query.page) : 1;
      const size = req.query.size ? Number(req.query.size) : 10;
      const response = await UserService.list(search, page, size);
      res.status(200).json({
        success: true,
        message: "Get users success",
        data: response.data,
        paging: response.paging,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminGet(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = String(req.params.username);
      const response = await UserService.getByUsername(username);
      res.status(200).json({
        success: true,
        message: "Get user success",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminCreate(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAdminUserRequest = req.body as CreateAdminUserRequest;
      const response = await UserService.createByAdmin(request);
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminUpdate(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = String(req.params.username);
      const request: UpdateAdminUserRequest = req.body as UpdateAdminUserRequest;
      const response = await UserService.updateByAdmin(username, request);
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminDelete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = String(req.params.username);
      const currentAdminUsername = req.user!.username;
      const response = await UserService.deleteByAdmin(username, currentAdminUsername);
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminCreateContact(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = String(req.params.username);
      const response = await UserService.createContact(username, req.body);
      res.status(201).json({
        success: true,
        message: "Contact created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminUpdateContact(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = String(req.params.username);
      const contactId = Number(req.params.contactId);
      const response = await UserService.updateContact(username, contactId, req.body);
      res.status(200).json({
        success: true,
        message: "Contact updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminDeleteContact(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = String(req.params.username);
      const contactId = Number(req.params.contactId);
      await UserService.deleteContact(username, contactId);
      res.status(200).json({
        success: true,
        message: "Contact deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminCreateAddress(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = String(req.params.username);
      const contactId = Number(req.params.contactId);
      const response = await UserService.createAddress(username, contactId, req.body);
      res.status(201).json({
        success: true,
        message: "Address created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminUpdateAddress(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = String(req.params.username);
      const contactId = Number(req.params.contactId);
      const addressId = Number(req.params.addressId);
      const response = await UserService.updateAddress(username, contactId, addressId, req.body);
      res.status(200).json({
        success: true,
        message: "Address updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminDeleteAddress(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = String(req.params.username);
      const contactId = Number(req.params.contactId);
      const addressId = Number(req.params.addressId);
      await UserService.deleteAddress(username, contactId, addressId);
      res.status(200).json({
        success: true,
        message: "Address deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
