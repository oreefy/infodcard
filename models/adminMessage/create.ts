import { prisma } from '@/db-config';
import { Console } from '@/middleware/http';
import { AdminMessageType, AdminMessageReturn, AdminMessageSelect } from '@/models/adminMessage/type';
import { UserModel } from '@/models';

interface AdminMessageCreateType {
    name: string;
    message: string;
    number: string;
}

export async function Create(authorIdentifier: string, data: AdminMessageCreateType, fields?: string): Promise<AdminMessageType | null> {
    try {
        const sanitized = data;
        const user = await UserModel.find.unique(authorIdentifier, fields);
        if (user) {
            const create = await prisma.adminMessages.create({
                data: {
                    name: sanitized.name,
                    number: sanitized.number,
                    message: sanitized.message,
                    authorUnique: user.unique
                },
                select: AdminMessageSelect(fields),
            })
            if (create) {
                return AdminMessageReturn(create, fields);
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}