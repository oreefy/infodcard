import { prisma } from '@/db-config';
import { Console } from '@/middleware/http';
import { AdminMessageType, AdminMessageReturn, AdminMessageSelect, AdminMessageReturns } from '@/models/adminMessage/type';
import { Sanitizer } from 'primepack';
import { UserModel } from '@/models';

export async function FindMany(options?: { fields?: string }): Promise<AdminMessageType[]> {
    try {
        const messages = await prisma.adminMessages.findMany({
            select: AdminMessageSelect(options?.fields),
        });
        return messages ? AdminMessageReturns(messages, options?.fields) : [];
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}

export async function FindUnique(unique: string, fields?: string): Promise<AdminMessageType | null> {
    try {
        const message = await prisma.adminMessages.findUnique({
            where: { unique: Sanitizer.toText(unique) },
            select: AdminMessageSelect(fields)
        });
        return message ? AdminMessageReturn(message, fields) : null;
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function FindAuthorMessages(authorIdentifier: string, fields?: string): Promise<AdminMessageType[]> {
    try {
        const author = await UserModel.find.unique(authorIdentifier, `user.adminMessagess ${fields}`);
        return author?.adminMessages ? AdminMessageReturns(author.adminMessages, fields) : [];
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}