import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';
import { LocalBankType, LocalBankSelect, LocalBankReturn } from '@/models/bank/local/type';
import { ProfileModel } from "@/models";

export async function Create(profileIdentifier: string, bank: string, name: string, number: string, branch: string): Promise<LocalBankType | null> {
    try {
        const profile = await ProfileModel.find.unique(profileIdentifier);
        if (profile) {
            const create = await prisma.localBank.create({
                data: {
                    authorUnique: profile.unique!,
                    bank: Sanitizer.toString(bank),
                    name: Sanitizer.toString(name),
                    number: Sanitizer.toString(number),
                    branch: Sanitizer.toString(branch),
                },
                select: LocalBankSelect(),
            })
            if (create) {
                return LocalBankReturn(create);
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
