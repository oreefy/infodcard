import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';
import { GlobalBankType, GlobalBankSelect, GlobalBankReturn } from '@/models/bank/global/type';
import { ProfileModel } from "@/models";

export async function Update(profileIdentifier: string, bankUnique: string, bank: string, lineOne: string, lineTwo: string, lineThree: string): Promise<GlobalBankType | null> {
    try {
        const profile = await ProfileModel.find.unique(profileIdentifier);
        if (profile) {
            const update = await prisma.globalBank.update({
                where: { unique: Sanitizer.toString(bankUnique) },
                data: {
                    bank: Sanitizer.toString(bank),
                    lineOne: Sanitizer.toString(lineOne),
                    lineTwo: Sanitizer.toString(lineTwo),
                    lineThree: Sanitizer.toString(lineThree),
                },
                select: GlobalBankSelect(),
            });
            if (update) {
                return GlobalBankReturn(update);
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
