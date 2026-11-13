import type { User } from "@prisma/client";

export type UserResponse = {
  name: string;
  username: string;
  token?: string;
  role?: string;
};

export type AddressDetail = {
  id: number;
  street?: string | null;
  city: string;
  province: string;
  country?: string | null;
  postal_code?: string | null;
  contact_id: number;
};

export type ContactDetail = {
  id: number;
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  username: string;
  addresses: AddressDetail[];
};

export type UserDetailResponse = UserResponse & {
  contacts: ContactDetail[];
};

export type CreateUserRequest = {
  name: string;
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type CreateAdminUserRequest = {
  name: string;
  username: string;
  password: string;
  role: string;
};

export type UpdateAdminUserRequest = {
  name?: string;
  password?: string;
  role?: string;
};

export type CreateUserContactRequest = {
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  address?: {
    street?: string | null;
    city: string;
    province: string;
    country?: string | null;
    postal_code?: string | null;
  };
};

export type UpdateUserContactRequest = {
  first_name?: string;
  last_name?: string;
  email?: string | null;
  phone?: string | null;
};

export type CreateUserAddressRequest = {
  street?: string | null;
  city: string;
  province: string;
  country?: string | null;
  postal_code?: string | null;
};

export type UpdateUserAddressRequest = {
  street?: string | null;
  city?: string;
  province?: string;
  country?: string | null;
  postal_code?: string | null;
};

export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
    role: user.role,
  };
}

export function toUserDetailResponse(user: any): UserDetailResponse {
  return {
    name: user.name,
    username: user.username,
    role: user.role,
    contacts: (user.contacts || []).map((contact: any) => ({
      id: contact.id,
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      username: contact.username,
      addresses: (contact.addresses || []).map((address: any) => ({
        id: address.id,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code,
        contact_id: address.contact_id,
      })),
    })),
  };
}
