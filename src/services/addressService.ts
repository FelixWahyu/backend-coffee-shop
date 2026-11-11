import type { Address, User } from "@prisma/client";
import { toAddressResponse, type AddressResponse, type CreateAddressRequest, type GetAddressRequest, type RemoveAddressRequest, type UpdateAddressRequest } from "../model/addressModel";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/addressValidation";
import { prismaClient } from "../application/database";
import { ContactService } from "../features/contact/contact.service";
import { ResponseError } from "../error/responseError";
import { th } from "zod/v4/locales";

export class AddressService {
  static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    const addressRequest = Validation.validate(AddressValidation.CREATE, request);

    await ContactService.checkContactExist(user.username, addressRequest.contact_id);

    const address = await prismaClient.address.create({
      data: addressRequest,
    });

    return toAddressResponse(address);
  }

  static async checkAddressExist(contactId: number, addressId: number): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new ResponseError(404, "Address not found");
    }

    return address;
  }

  static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const addressRequest = Validation.validate(AddressValidation.GET, request);

    await ContactService.checkContactExist(user.username, request.contact_id);

    const address = await this.checkAddressExist(addressRequest.contact_id, addressRequest.id);

    return toAddressResponse(address);
  }

  static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
    const updateRequest = Validation.validate(AddressValidation.UPDATE, request);

    await ContactService.checkContactExist(user.username, updateRequest.contact_id);

    await this.checkAddressExist(updateRequest.contact_id, updateRequest.id);

    const address = await prismaClient.address.update({
      where: {
        id: updateRequest.id,
        contact_id: updateRequest.contact_id,
      },
      data: updateRequest,
    });

    return toAddressResponse(address);
  }

  static async delete(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {
    const removeRequest = Validation.validate(AddressValidation.REMOVE, request);
    await ContactService.checkContactExist(user.username, removeRequest.contact_id);
    await this.checkAddressExist(removeRequest.contact_id, removeRequest.id);

    const address = await prismaClient.address.delete({
      where: {
        id: removeRequest.id,
        contact_id: removeRequest.contact_id,
      },
    });

    return toAddressResponse(address);
  }

  static async list(user: User, contactId: number): Promise<Array<AddressResponse>> {
    await ContactService.checkContactExist(user.username, contactId);
    const addresses = await prismaClient.address.findMany({
      where: {
        contact_id: contactId,
      },
    });

    return addresses.map((address) => toAddressResponse(address));
  }
}
