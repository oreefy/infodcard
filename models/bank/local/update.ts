import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';
import { LocalBankType, LocalBankSelect, LocalBankReturn } from '@/models/bank/local/type';
import { ProfileModel } from "@/models";

export async function Update(profileIdentifier: string, bankUnique: string, bank: string, name: string, number: string, branch: string): Promise<LocalBankType | null> {
    try {
        const profile = await ProfileModel.find.unique(profileIdentifier);
        if (profile) {
            const update = await prisma.localBank.update({
                where: { unique: Sanitizer.toString(bankUnique) },
                data: {
                    bank: Sanitizer.toString(bank),
                    name: Sanitizer.toString(name),
                    number: Sanitizer.toString(number),
                    branch: Sanitizer.toString(branch),
                },
                select: LocalBankSelect(),
            });
            if (update) {
                return LocalBankReturn(update);
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
