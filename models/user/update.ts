import { prisma } from "@/db-config";
import { UserType, UserSelect, UserReturn } from '@/models/user/type'
import { UserModel } from '@/models'
import { Console } from "@/middleware/http";
import { Hash, Sanitizer } from 'primepack'

export async function Update(identifier: string, data: { email?: string; plan?: "FREE" | "PREMIUM" | "BUSINESS"; phone?: string; code?: string; ads?: Date; password?: string; profileLength?: number; createdAt?: Date; }, fields?: string): Promise<UserType | null> {
    try {
        const find = await UserModel.find.unique(identifier);
        if (find) {
            const update = await prisma.user.update({
                where: { unique: find.unique },
                data: {
                    email: data.email ? Sanitizer.normalizeEmail(data.email) : undefined,
                    plan: data.plan ? Sanitizer.toText(data.plan) === "FREE" ? "FREE" : Sanitizer.toText(data.plan) === "PREMIUM" ? "PREMIUM" : Sanitizer.toText(data.plan) === "BUSINESS" ? "BUSINESS" : undefined : undefined,
                    phone: data.phone ? Sanitizer.toText(data.phone) : undefined,
                    code: data.code ? Sanitizer.toText(data.code) : undefined,
                    ads: data.ads ? Sanitizer.toString(data.ads) : undefined,
                    password: data.password ? await Hash.make(Sanitizer.toString(data.password)) : undefined,
                    profileLength: data.profileLength ? +(Sanitizer.toNumber(data.profileLength) as number) : undefined,
                    createdAt: data.createdAt ? Sanitizer.toString(data.createdAt) : undefined
                },
                select: UserSelect(fields),
            })
            if (update) {
                return UserReturn(update, fields);
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
export async function ComparePassword(identifier: string, hashed: string, password: string): Promise<boolean> {
    try {
        const find = await UserModel.find.unique(identifier, "user.password");
        if (find) {
            if (await Hash.compare(password, hashed)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error: any) {
        Console(error.message);
        return false;
    }
}
export async function ChangePassword(identifier: string, password: string): Promise<boolean> {
    try {
        const update = await UserModel.update(identifier, { password: password });
        if (update) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        Console(error.message);
        return false;
    }
}
