import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';
import { ProfileModel, ProductModel } from "@/models";

export async function Delete(profileIdentifier: string, serviceUnique: string): Promise<boolean> {
    try {
        const profile = await ProfileModel.find.unique(profileIdentifier);
        if (profile) {
            const deleted = await prisma.service.delete({ where: { unique: Sanitizer.toString(serviceUnique) } });
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