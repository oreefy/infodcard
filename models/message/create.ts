import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';
import { MessageType, MessageReturn, MessageSelect } from "@/models/message/type";
import { ProfileModel } from "@/models";

export async function Create(profileIdentifier: string, name: string, number: string, message: string, fields?: string): Promise<MessageType | null> {
    try {
        const profile = await ProfileModel.find.unique(profileIdentifier, "profile.authorUnique");
        if (profile) {
            const create = await prisma.message.create({
                data: {
                    authorUnique: profile.authorUnique!,
                    name: Sanitizer.toString(name),
                    message: Sanitizer.toString(message),
                    number: Sanitizer.toText(number),
                },
                select: MessageSelect(fields),
            })
            if (create) {
                return MessageReturn(create, fields);
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
