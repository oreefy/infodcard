import { prisma } from '@/db-config';
import { Console } from '@/middleware/http';
import { Sanitizer } from 'primepack';

export async function Delete(unique: string): Promise<boolean> {
    try {
        const deleteMessage = await prisma.contact.delete({ where: { unique: Sanitizer.toText(unique) }, select: { unique: true } });
        if (deleteMessage) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        Console(error.message);
        return false;
    }
}
