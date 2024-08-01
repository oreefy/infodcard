import { prisma } from '@/db-config';
import { Console } from '@/middleware/http';
import { ProductType, ProductSelect, ProductReturn } from '@/models/product/type';
import { Sanitizer } from 'primepack';
import { ProfileModel } from '@/models';

export async function FindUnique(unique: string): Promise<ProductType | null> {
    try {
        const find = await prisma.product.findUnique({
            where: { unique: Sanitizer.toText(unique) },
            select: ProductSelect()
        });
        return find ? ProductReturn(find) : null;
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function FindProfileProducts(authorIdentifier: string, profileIdentifier: string, fields?: string): Promise<ProductType[]> {
    try {
        const profile = await ProfileModel.find.authorProfile(authorIdentifier, profileIdentifier, `${fields} profile.products`);
        if (profile) {
            return profile.products || [];
        } else {
            return [];
        }
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}