import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';
import { MobileBankType, MobileBankSelect, MobileBankReturn } from '@/models/bank/mobile/type';
import { ProfileModel } from "@/models";

export async function Create(profileIdentifier: string, name: string, type: string, number: string): Promise<MobileBankType | null> {
    try {
        const profile = await ProfileModel.find.unique(profileIdentifier);
        if (profile) {
            const create = await prisma.mobileBank.create({
                data: {
                    authorUnique: profile.unique!,
                    name: Sanitizer.toString(name),
                    type: Sanitizer.toString(type),
                    number: Sanitizer.toString(number),
                },
                select: MobileBankSelect(),
            })
            if (create) {
                return MobileBankReturn(create);
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
