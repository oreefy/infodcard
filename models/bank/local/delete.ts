import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';
import { ProfileModel } from "@/models";

export async function Delete(profileIdentifier: string, bankUnique: string): Promise<boolean> {
    try {
        const profile = await ProfileModel.find.unique(profileIdentifier);
        if (profile) {
            const deleted = await prisma.localBank.delete({ where: { unique: Sanitizer.toString(bankUnique) } });
            if (deleted) {
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
