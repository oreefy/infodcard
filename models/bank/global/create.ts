import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';
import { GlobalBankType, GlobalBankSelect, GlobalBankReturn } from '@/models/bank/global/type';
import { ProfileModel } from "@/models";

export async function Create(profileIdentifier: string, bank: string, lineOne: string, lineTwo: string, lineThree: string): Promise<GlobalBankType | null> {
    try {
        const profile = await ProfileModel.find.unique(profileIdentifier);
        if (profile) {
            const create = await prisma.globalBank.create({
                data: {
                    authorUnique: profile.unique!,
                    bank: Sanitizer.toString(bank),
                    lineOne: Sanitizer.toString(lineOne),
                    lineTwo: Sanitizer.toString(lineTwo),
                    lineThree: Sanitizer.toString(lineThree),
                },
                select: GlobalBankSelect(),
            })
            if (create) {
                return GlobalBankReturn(create);
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
