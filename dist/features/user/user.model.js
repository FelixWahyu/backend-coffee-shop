"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
exports.toUserDetailResponse = toUserDetailResponse;
function toUserResponse(user) {
    return {
        name: user.name,
        username: user.username,
        role: user.role,
    };
}
function toUserDetailResponse(user) {
    return {
        name: user.name,
        username: user.username,
        role: user.role,
        contacts: (user.contacts || []).map((contact) => ({
            id: contact.id,
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone,
            username: contact.username,
            addresses: (contact.addresses || []).map((address) => ({
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
