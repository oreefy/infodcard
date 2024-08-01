import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { TransactionType, TransactionSelect, TransactionReturn } from "@/models/transaction/type";
import { Sanitizer } from "primepack";
import { CouponModel, UserModel } from "@/models";

interface TransactionCreateType {
    plan: "FREE" | "PREMIUM" | "BUSINESS";
    price: number;
    quantity: number,
    extend: boolean,
    coupon: string;
    name: string;
    phone: string;
    address: string;
    product: string;
    method: string;
    trxID: string;
    provider: {
        logo: string;
        provider: string;
        number: string;
    }
}

export async function Create(authorIdentifier: string, data: TransactionCreateType, fields?: string): Promise<TransactionType | null> {
    try {
        const sanitized = {
            plan: Sanitizer.toText(data.plan) as "FREE" | "PREMIUM" | "BUSINESS",
            price: typeof data.price === "number" ? data.price : 0,
            quantity: typeof data.quantity === "number" ? data.quantity : 0,
            extend: data.extend ? true : false,
            coupon: Sanitizer.toText(data.coupon).substring(0, 20).toUpperCase(),
            name: Sanitizer.toString(data.name).substring(0, 150),
            phone: Sanitizer.toText(data.phone).substring(0, 50),
            address: Sanitizer.toString(data.address).substring(0, 220),
            product: Sanitizer.toString(data.product).substring(0, 100),
            method: Sanitizer.toString(data.method).substring(0, 100),
            trxID: Sanitizer.toString(data.trxID).substring(0, 50),
            provider: {
                logo: Sanitizer.toString(data.provider.logo).substring(0, 200),
                provider: Sanitizer.toString(data.provider.provider).substring(0, 100),
                number: Sanitizer.toString(data.provider.number).substring(0, 100),
            }
        }
        const user = await UserModel.find.unique(authorIdentifier);
        const CouponProfile = await CouponModel.find.profile(sanitized.coupon);
        const invoice = await CouponModel.couponGenerator();
        if (user && invoice) {
            const create = await prisma.transaction.create({
                data: {
                    authorUnique: user.unique,
                    couponName: CouponProfile?.coupon.code,
                    couponPercentage: CouponProfile?.coupon.percentage,
                    couponPartner: CouponProfile?.coupon.partner,
                    couponClient: CouponProfile?.coupon.client,
                    couponProviderUnique: CouponProfile?.coupon.providerUnique,
                    invoice: invoice,
                    plan: sanitized.plan,
                    amount: sanitized.price,
                    quantity: sanitized.quantity,
                    extend: sanitized.extend,
                    accountNumber: sanitized.provider.number,
                    method: sanitized.provider.provider,
                    name: sanitized.name,
                    phone: sanitized.phone,
                    address: sanitized.address,
                    product: sanitized.product,
                    trxID: sanitized.trxID,
                },
                select: TransactionSelect(fields)
            })
            if (create) {
                return TransactionReturn(create, fields);
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