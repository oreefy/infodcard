import { prisma } from '@/db-config';
import { Console } from '@/middleware/http';
import { UserModel } from '@/models';
import { Sanitizer } from 'primepack';

export async function Delete(authorIdentifier: string, adminMessageUnique: string): Promise<boolean> {
    try {
        const user = await UserModel.find.unique(authorIdentifier);
        if (user) {
            const deleteMessage = await prisma.message.delete({ where: { unique: Sanitizer.toText(adminMessageUnique) }, select: { unique: true } });
            if (deleteMessage) {
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
