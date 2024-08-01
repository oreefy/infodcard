export interface MessageType {
    unique: string;
    name: string;
    message: string;
    number?: string;
    read?: boolean;
    authorUnique?: string;
    createdAt?: Date;
}
export function MessageSelect(fields?: string) {
    return {
        unique: true,
        name: true,
        message: true,
        number: fields?.includes("message.number"),
        read: fields?.includes("message.read"),
        authorUnique: fields?.includes("message.authorUnique"),
        createdAt: fields?.includes("message.createdAt"),
    }
}
export function MessageReturn(message: MessageType, fields?: string) {
    const response: MessageType = { unique: "", name: "", message: "" };
    response.unique = message.unique;
    response.name = message.name;
    response.message = message.message;
    if (fields?.includes("message.number")) { response.number = message.number }
    if (fields?.includes("message.read")) { response.read = message.read }
    if (fields?.includes("message.authorUnique")) { response.authorUnique = message.authorUnique }
    if (fields?.includes("message.createdAt")) { response.createdAt = message.createdAt }
    return response;
}
export function MessageReturns(messages: MessageType[], fields?: string) {
    const response: MessageType[] = [];
    messages.map((message) => {
        response.push(MessageReturn(message, fields));
    });
    return response;
}