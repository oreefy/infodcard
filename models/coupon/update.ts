import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { CouponType, CouponReturn } from '@/models/coupon/type';
import { UserSelect } from '@/models/user/type';
import { Sanitizer } from "primepack";
import { CouponModel, UserModel } from "@/models";

interface CouponUpdateType {
    percentage?: number;
    partner?: number;
    client?: number;
    code?: string;
    status?: boolean;
    custom?: boolean;
    createdAt?: Date
}

export async function Update(identifier: string, data: CouponUpdateType, fields?: string): Promise<CouponType | null> {
    try {
        const sanitized: CouponUpdateType = {
            code: data.code ? Sanitizer.toText(data.code).toUpperCase() : undefined,
            percentage: data.percentage ? Sanitizer.toNumber(data.percentage) as number : undefined,
            partner: data.partner ? Sanitizer.toNumber(data.partner) as number : undefined,
            client: data.client ? Sanitizer.toNumber(data.client) as number : undefined,
            status: data.status === undefined ? undefined : data.status ? true : false,
            custom: data.custom === undefined ? undefined : data.custom ? true : false,
            createdAt: data.createdAt ? new Date(Sanitizer.toString(data.createdAt)) : undefined,
        };
        const user = await UserModel.find.unique(identifier, "user.coupon coupon.custom");
        const globalCoupon = await CouponModel.global.find();
        if (user && globalCoupon) {
            if (user.coupon) {
                if (user.coupon.custom) {
                    if (user.coupon.percentage >= ((data.partner || 0) + (data.client || 0))) {
                        const update = await prisma.user.update({
                            where: { unique: user.unique },
                            data: { code: sanitized.code, coupon: { update: { percentage: sanitized.percentage, partner: sanitized.partner, client: sanitized.client, status: sanitized.status, custom: sanitized.custom, createdAt: sanitized.createdAt } } },
                            select: UserSelect(`user.coupon ${fields}`),
                        });
                        return update ? CouponReturn(update.coupon!, fields) : null;
                    } else {
                        return null;
                    }
                } else {
                    if (globalCoupon.percentage >= ((data.partner || 0) + (data.client || 0))) {
                        const update = await prisma.user.update({
                            where: { unique: user.unique },
                            data: { code: sanitized.code, coupon: { update: { percentage: sanitized.percentage, partner: sanitized.partner, client: sanitized.client, status: sanitized.status, custom: sanitized.custom, createdAt: sanitized.createdAt } } },
                            select: UserSelect(`user.coupon ${fields}`),
                        });
                        return update ? CouponReturn(update.coupon!, fields) : null;
                    } else {
                        return null;
                    }
                }
            } else {
                if (globalCoupon.percentage >= ((data.partner || 0) + (data.client || 0))) {
                    const create = await prisma.user.update({
                        where: { unique: user.unique },
                        data: { code: sanitized.code, coupon: { create: { percentage: sanitized.percentage, partner: sanitized.partner, client: sanitized.client, status: sanitized.status, custom: sanitized.custom, createdAt: sanitized.createdAt } } },
                        select: UserSelect(`user.coupon ${fields}`),
                    });
                    return create ? CouponReturn(create.coupon!, fields) : null;
                } else {
                    return null;
                }
            }
        } else {
            return null;
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}