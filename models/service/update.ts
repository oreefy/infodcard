import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';
import { ServiceType, ServiceSelect, ServiceReturn } from '@/models/service/type';
import { ProfileModel } from "@/models";

export async function Update(serviceIdentifier: string, serviceUnique: string, title: string, price: string, message: string): Promise<ServiceType | null> {
    try {
        const profile = await ProfileModel.find.unique(serviceIdentifier);
        if (profile) {
            const create = await prisma.service.update({
                where: { unique: Sanitizer.toString(serviceUnique) },
                data: {
                    title: Sanitizer.toString(title),
                    price: Sanitizer.toString(price),
                    message: Sanitizer.toString(message),
                },
                select: ServiceSelect(),
            });
            if (create) {
                return ServiceReturn(create);
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
