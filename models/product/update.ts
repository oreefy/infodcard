import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';
import { ProductType, ProductSelect, ProductReturn } from '@/models/product/type';
import { ProfileModel } from "@/models";

export async function Update(profileIdentifier: string, productUnique: string, title: string, price: string, message: string): Promise<ProductType | null> {
    try {
        const profile = await ProfileModel.find.unique(profileIdentifier);
        if (profile) {
            const create = await prisma.product.update({
                where: { unique: Sanitizer.toString(productUnique) },
                data: {
                    title: Sanitizer.toString(title),
                    price: Sanitizer.toString(price),
                    message: Sanitizer.toString(message),
                },
                select: ProductSelect(),
            });
            if (create) {
                return ProductReturn(create);
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
