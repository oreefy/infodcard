import { Console } from "@/middleware/http";
import { OrderType, OrderSelect, OrderReturn } from "@/models/order/type";
import { CouponModel, OrderModel, UserModel } from "@/models";
import { prisma } from "@/db-config";

interface CreateOrderType {
    email?: string;
    design: string;
    front: string;
    back: string;
    price: number;
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

export async function Create(data: CreateOrderType, fields?: string): Promise<OrderType | null> {
    try {
        const sanitized = data;
        const coupon = await CouponModel.find.profile(sanitized.coupon);
        const invoice = await OrderModel.generateInvoice();
        const user = data.email ? await UserModel.find.unique(data.email) : undefined;
        if (invoice) {
            const create = await prisma.order.create({
                data: {
                    invoice: invoice,
                    product: sanitized.product,
                    design: sanitized.design,
                    front: sanitized.front,
                    back: sanitized.back,
                    amount: sanitized.price,
                    accountNumber: sanitized.provider.number,
                    method: sanitized.provider.provider,
                    name: sanitized.name,
                    phone: sanitized.phone,
                    address: sanitized.address,
                    trxID: sanitized.trxID,
                    couponName: coupon?.coupon?.code,
                    couponPercentage: coupon?.coupon.percentage,
                    couponPartner: coupon?.coupon.partner,
                    couponClient: coupon?.coupon.client,
                    couponProviderUnique: coupon?.coupon.providerUnique,
                    authorUnique: data.email ? user?.unique || undefined : undefined
                },
                select: OrderSelect(fields)
            });
            if (create) {
                return OrderReturn(create, fields);
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