import { prisma } from '@/db-config';
import { Console } from '@/middleware/http';
import { MessageType, MessageSelect, MessageReturn, MessageReturns } from '@/models/message/type';
import { Sanitizer } from 'primepack';
import { UserModel } from '@/models';

export async function FindUnique(unique: string, fields?: string): Promise<MessageType | null> {
    try {
        const message = await prisma.message.findUnique({
            where: { unique: Sanitizer.toText(unique) },
            select: MessageSelect(fields)
        });
        return message ? MessageReturn(message, fields) : null;
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function FindAuthorMessages(authorIdentifier: string, fields?: string): Promise<MessageType[]> {
    try {
        const author = await UserModel.find.unique(authorIdentifier, `user.messages ${fields}`);
        return author?.messages ? MessageReturns(author.messages, fields) : [];
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}