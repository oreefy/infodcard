import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { ContactReturns, ContactSelect, ContactType } from "@/models/contact/type";

export async function FindMany(options?: { fields?: string }): Promise<ContactType[]> {
    try {
        const messages = await prisma.contact.findMany({
            select: ContactSelect(options?.fields),
        });
        return messages ? ContactReturns(messages, options?.fields) : [];
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}