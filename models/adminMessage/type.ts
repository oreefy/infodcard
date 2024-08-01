export interface AdminMessageType {
    unique: string;
    name: string;
    message: string;
    number?: string;
    read?: boolean;
    authorUnique?: string;
    createdAt?: Date;
}
export function AdminMessageSelect(fields?: string) {
    return {
        unique: true,
        name: true,
        message: true,
        number: fields?.includes("adminMessage.number"),
        read: fields?.includes("adminMessage.read"),
        authorUnique: fields?.includes("adminMessage.authorUnique"),
        createdAt: fields?.includes("adminMessage.createdAt"),
    }
}
export function AdminMessageReturn(adminMessage: AdminMessageType, fields?: string) {
    const response: AdminMessageType = { unique: "", name: "", message: "" };
    response.unique = adminMessage.unique;
    response.name = adminMessage.name;
    response.message = adminMessage.message;
    if (fields?.includes("adminMessage.number")) { response.number = adminMessage.number }
    if (fields?.includes("adminMessage.read")) { response.read = adminMessage.read }
    if (fields?.includes("adminMessage.authorUnique")) { response.authorUnique = adminMessage.authorUnique }
    if (fields?.includes("adminMessage.createdAt")) { response.createdAt = adminMessage.createdAt }
    return response;
}
export function AdminMessageReturns(adminMessages: AdminMessageType[], fields?: string) {
    const response: AdminMessageType[] = [];
    adminMessages.map((adminMessage) => {
        response.push(AdminMessageReturn(adminMessage, fields));
    });
    return response;
}