import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { SocialType, SocialReturn, SocialSelect } from "@/models/social/type";
import { Sanitizer } from "primepack";

export async function FindUnique(identifier: string): Promise<SocialType | null> {
    try {
        const find = await prisma.social.findUnique({
            where: { unique: Sanitizer.toText(identifier) },
            select: SocialSelect(),
        });
        return find ? SocialReturn(find) : null;
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}