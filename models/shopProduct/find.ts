import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { ShopProductReturn, ShopProductReturns, ShopProductSelect, ShopProductType } from '@/models/shopProduct/type'
import { Sanitizer } from "primepack";

export async function FindUnique(identifier: string, fields?: string): Promise<ShopProductType | null> {
    try {
        let find = await prisma.shopProduct.findUnique({
            where: { unique: Sanitizer.toText(identifier) },
            select: ShopProductSelect(fields)
        })
        if (find) {
            return ShopProductReturn(find, fields);
        } else {
            find = await prisma.shopProduct.findUnique({
                where: { path: Sanitizer.toText(identifier) },
                select: ShopProductSelect(fields)
            })
            if (find) {
                return ShopProductReturn(find, fields);
            } else {
                return null;
            }
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function FindAll(fields?: string): Promise<ShopProductType[]> {
    try {
        let find = await prisma.shopProduct.findMany({ select: ShopProductSelect(fields) })
        return ShopProductReturns(find, fields);
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}