export interface ContactType {
    unique: string;
    email: string;
    name: string;
    subject: string;
    message: string;
    number?: string;
    read?: boolean;
    createdAt?: Date;
}
export function ContactSelect(fields?: string) {
    return {
        unique: true,
        email: true,
        name: true,
        subject: true,
        message: true,
        number: fields?.includes("coupon.number"),
        read: fields?.includes("coupon.read"),
        createdAt: fields?.includes("coupon.createdAt"),
    }
}
export function ContactReturn(contact: ContactType, fields?: string) {
    const response: ContactType = { unique: "", email: "", name: "", subject: "", message: "", };
    response.unique = contact.unique
    response.email = contact.email
    response.name = contact.name
    response.subject = contact.subject
    response.message = contact.message
    if (fields?.includes("contact.number")) { response.number = contact.number }
    if (fields?.includes("contact.read")) { response.read = contact.read }
    if (fields?.includes("contact.createdAt")) { response.createdAt = contact.createdAt }
    return response;
}
export function ContactReturns(contacts: ContactType[], fields?: string) {
    const response: ContactType[] = [];
    contacts.map((contact) => {
        response.push(ContactReturn(contact, fields));
    });
    return response;
}