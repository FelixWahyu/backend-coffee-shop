import type { User } from "@prisma/client";
import { prismaClient } from "../../application/database";
import { ResponseError } from "../../error/responseError";
import {
  toUserResponse,
  toUserDetailResponse,
  type CreateUserRequest,
  type LoginUserRequest,
  type UserResponse,
  type UserDetailResponse,
  type UpdateUserRequest,
  type CreateAdminUserRequest,
  type UpdateAdminUserRequest,
  type CreateUserContactRequest,
  type UpdateUserContactRequest,
  type CreateUserAddressRequest,
  type UpdateUserAddressRequest,
  type ContactDetail,
  type AddressDetail,
} from "./user.model";
import type { Pageable } from "../../model/page";
import { UserValidation } from "./user.validation";
import { Validation } from "../../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, request);

    const totalUserSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUserSameUsername != 0) {
      throw new ResponseError(400, "Username already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username or Password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or Password is wrong");
    }

    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;

    return response;
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    if (updateRequest.name) {
      user.name = updateRequest.name;
    }

    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const result = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    return toUserResponse(result);
  }

  static async logout(user: User): Promise<UserResponse> {
    const result = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return toUserResponse(result);
  }

  static async delete(username: string): Promise<UserResponse> {
    const isUserExist = await prismaClient.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!isUserExist) {
      throw new ResponseError(404, "User not found");
    }

    const result = await prismaClient.user.delete({
      where: {
        username: username,
      },
    });

    return toUserResponse(result);
  }

  static async list(search?: string, page: number = 1, size: number = 10): Promise<Pageable<UserResponse>> {
    const whereClause: any = {};
    if (search) {
      whereClause.OR = [{ username: { contains: search } }, { name: { contains: search } }];
    }

    const skip = (page - 1) * size;
    const [users, total] = await Promise.all([
      prismaClient.user.findMany({
        where: whereClause,
        skip,
        take: size,
        orderBy: { username: "asc" },
      }),
      prismaClient.user.count({
        where: whereClause,
      }),
    ]);

    return {
      data: users.map(toUserResponse),
      paging: {
        size,
        total_page: Math.ceil(total / size) || 1,
        current_page: page,
      },
    };
  }

  static async getByUsername(username: string): Promise<UserDetailResponse> {
    const user = await prismaClient.user.findUnique({
      where: { username },
      include: {
        contacts: {
          include: {
            addresses: true,
          },
        },
      },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    return toUserDetailResponse(user);
  }

  static async createByAdmin(request: CreateAdminUserRequest): Promise<UserResponse> {
    const createRequest = Validation.validate(UserValidation.ADMIN_CREATE, request);

    const isExist = await prismaClient.user.findUnique({
      where: { username: createRequest.username },
    });

    if (isExist) {
      throw new ResponseError(400, "Username already exists");
    }

    const hashedPassword = await bcrypt.hash(createRequest.password, 10);

    const user = await prismaClient.user.create({
      data: {
        username: createRequest.username,
        name: createRequest.name,
        password: hashedPassword,
        role: createRequest.role,
      },
    });

    return toUserResponse(user);
  }

  static async updateByAdmin(username: string, request: UpdateAdminUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.ADMIN_UPDATE, request);

    const user = await prismaClient.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const dataToUpdate: any = {};
    if (updateRequest.name) {
      dataToUpdate.name = updateRequest.name;
    }
    if (updateRequest.role) {
      dataToUpdate.role = updateRequest.role;
    }
    if (updateRequest.password && updateRequest.password.trim() !== "") {
      dataToUpdate.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const updatedUser = await prismaClient.user.update({
      where: { username },
      data: dataToUpdate,
    });

    return toUserResponse(updatedUser);
  }

  static async deleteByAdmin(username: string, currentAdminUsername: string): Promise<UserResponse> {
    if (username === currentAdminUsername) {
      throw new ResponseError(400, "Cannot delete your own admin account");
    }

    const user = await prismaClient.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    await prismaClient.review.deleteMany({
      where: { username },
    });

    const contacts = await prismaClient.contact.findMany({
      where: { username },
      select: { id: true },
    });
    const contactIds = contacts.map((c) => c.id);
    if (contactIds.length > 0) {
      await prismaClient.address.deleteMany({
        where: { contact_id: { in: contactIds } },
      });
      await prismaClient.contact.deleteMany({
        where: { username },
      });
    }

    const deletedUser = await prismaClient.user.delete({
      where: { username },
    });

    return toUserResponse(deletedUser);
  }

  static async createContact(username: string, request: CreateUserContactRequest): Promise<ContactDetail> {
    const validated = Validation.validate(UserValidation.CONTACT_CREATE, request);

    const user = await prismaClient.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const { address, ...contactData } = validated;

    const contact = await prismaClient.contact.create({
      data: {
        first_name: contactData.first_name,
        last_name: contactData.last_name,
        email: contactData.email || null,
        phone: contactData.phone || null,
        username: username,
        addresses: address
          ? {
              create: {
                street: address.street || null,
                city: address.city,
                province: address.province,
                country: address.country || null,
                postal_code: address.postal_code || null,
              },
            }
          : undefined,
      },
      include: {
        addresses: true,
      },
    });

    return {
      id: contact.id,
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      username: contact.username,
      addresses: contact.addresses.map((a) => ({
        id: a.id,
        street: a.street,
        city: a.city,
        province: a.province,
        country: a.country,
        postal_code: a.postal_code,
        contact_id: a.contact_id,
      })),
    };
  }

  static async updateContact(username: string, contactId: number, request: UpdateUserContactRequest): Promise<ContactDetail> {
    const validated = Validation.validate(UserValidation.CONTACT_UPDATE, request);

    const existing = await prismaClient.contact.findFirst({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!existing) {
      throw new ResponseError(404, "Contact not found");
    }

    const updated = await prismaClient.contact.update({
      where: { id: contactId },
      data: {
        first_name: validated.first_name ?? existing.first_name,
        last_name: validated.last_name ?? existing.last_name,
        email: validated.email !== undefined ? validated.email || null : existing.email,
        phone: validated.phone !== undefined ? validated.phone || null : existing.phone,
      },
      include: {
        addresses: true,
      },
    });

    return {
      id: updated.id,
      first_name: updated.first_name,
      last_name: updated.last_name,
      email: updated.email,
      phone: updated.phone,
      username: updated.username,
      addresses: updated.addresses.map((a) => ({
        id: a.id,
        street: a.street,
        city: a.city,
        province: a.province,
        country: a.country,
        postal_code: a.postal_code,
        contact_id: a.contact_id,
      })),
    };
  }

  static async deleteContact(username: string, contactId: number): Promise<void> {
    const existing = await prismaClient.contact.findFirst({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!existing) {
      throw new ResponseError(404, "Contact not found");
    }

    await prismaClient.$transaction([
      prismaClient.address.deleteMany({ where: { contact_id: contactId } }),
      prismaClient.contact.delete({ where: { id: contactId } }),
    ]);
  }

  static async createAddress(username: string, contactId: number, request: CreateUserAddressRequest): Promise<AddressDetail> {
    const validated = Validation.validate(UserValidation.ADDRESS_CREATE, request);

    const contact = await prismaClient.contact.findFirst({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    const address = await prismaClient.address.create({
      data: {
        contact_id: contactId,
        street: validated.street || null,
        city: validated.city,
        province: validated.province,
        country: validated.country || null,
        postal_code: validated.postal_code || null,
      },
    });

    return {
      id: address.id,
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
      contact_id: address.contact_id,
    };
  }

  static async updateAddress(username: string, contactId: number, addressId: number, request: UpdateUserAddressRequest): Promise<AddressDetail> {
    const validated = Validation.validate(UserValidation.ADDRESS_UPDATE, request);

    const contact = await prismaClient.contact.findFirst({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    const existingAddress = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!existingAddress) {
      throw new ResponseError(404, "Address not found");
    }

    const updated = await prismaClient.address.update({
      where: { id: addressId },
      data: {
        street: validated.street !== undefined ? validated.street || null : existingAddress.street,
        city: validated.city ?? existingAddress.city,
        province: validated.province ?? existingAddress.province,
        country: validated.country !== undefined ? validated.country || null : existingAddress.country,
        postal_code: validated.postal_code !== undefined ? validated.postal_code || null : existingAddress.postal_code,
      },
    });

    return {
      id: updated.id,
      street: updated.street,
      city: updated.city,
      province: updated.province,
      country: updated.country,
      postal_code: updated.postal_code,
      contact_id: updated.contact_id,
    };
  }

  static async deleteAddress(username: string, contactId: number, addressId: number): Promise<void> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    const existingAddress = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!existingAddress) {
      throw new ResponseError(404, "Address not found");
    }

    await prismaClient.address.delete({
      where: { id: addressId },
    });
  }
}
