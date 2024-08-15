import { prisma } from "@/db-config";
import { UserReturn, UserReturns, UserType, UserSelect } from '@/models/user/type';
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';

export async function FindMany(options?: { plan?: "FREE" | "PREMIUM" | "BUSINESS", fields?: string }): Promise<UserType[]> {
    try {
        const users = await prisma.user.findMany({
            where: {
                plan: options?.plan || undefined,
            },
            orderBy: {
                createdAt: "desc"
            },
            select: UserSelect(options?.fields)
        });
        return UserReturns(users, options?.fields);
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}
export async function FindUnique(identifier: string, fields?: string): Promise<UserType | null> {
    try {
        let user: UserType | null = null;
        user = await prisma.user.findUnique({ where: { unique: Sanitizer.toText(identifier) }, select: UserSelect(fields) });
        if (user) {
            return UserReturn(user, fields);
        } else {
            user = await prisma.user.findUnique({ where: { email: Sanitizer.normalizeEmail(identifier) }, select: UserSelect(fields) });
            if (user) {
                return UserReturn(user, fields);
            } else {
                user = await prisma.user.findUnique({ where: { phone: Sanitizer.toText(identifier) }, select: UserSelect(fields) });
                if (user) {
                    return UserReturn(user, fields);
                } else {
                    user = await prisma.user.findUnique({ where: { code: Sanitizer.toText(identifier) }, select: UserSelect(fields) });
                    if (user) {
                        return UserReturn(user, fields);
                    } else {
                        return null;
                    }
                }
            }
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}