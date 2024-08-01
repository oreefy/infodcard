import { prisma } from '@/db-config';
import { Console } from '@/middleware/http';
import { ServiceType, ServiceSelect, ServiceReturn } from '@/models/service/type';
import { Sanitizer } from 'primepack';
import { ProfileModel } from '@/models';

export async function FindUnique(unique: string): Promise<ServiceType | null> {
    try {
        const find = await prisma.service.findUnique({
            where: { unique: Sanitizer.toText(unique) },
            select: ServiceSelect()
        });
        return find ? ServiceReturn(find) : null;
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function FindProfileProducts(authorIdentifier: string, profileIdentifier: string): Promise<ServiceType[]> {
    try {
        const profile = await ProfileModel.find.authorProfile(authorIdentifier, profileIdentifier, `profile.services`);
        if (profile) {
            return profile.services || [];
        } else {
            return [];
        }
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}