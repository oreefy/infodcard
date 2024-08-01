import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { UserType, UserSelect, UserReturn } from "@/models/user/type";
import { Hash, Sanitizer } from 'primepack'
import { UserModel } from '@/models'

export async function Create(phone: string, email: string, password: string, fields?: string): Promise<UserType | null> {
    try {
        const hashed = await Hash.make(Sanitizer.toString(password));
        const code = await UserModel.codeGenerate();
        const now = new Date();
        if (code) {
            const create = await prisma.user.create({
                data: {
                    code: code.toUpperCase(),
                    phone: Sanitizer.toText(phone),
                    email: Sanitizer.normalizeEmail(email),
                    password: hashed,
                    ads: new Date(`${(now.getMonth() + 1) + 1}/${now.getDate()}/${now.getFullYear()}`),
                },
                select: UserSelect(fields),
            })
            if (create) {
                return UserReturn(create, fields);
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