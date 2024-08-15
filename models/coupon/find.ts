import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { CouponType, CouponSelect, CouponReturn, CouponReturns } from '@/models/coupon/type';
import { UserType, UserSelect } from '@/models/user/type';
import { Sanitizer } from "primepack";
import { CouponModel, OrderModel, TransactionModel, UserModel, WithdrawModel } from "@/models";

interface CouponProfileType {
    earning: { total: number; orders: number; upgrade: number; withdraws: number; pending: number };
    coupon: { percentage: number; partner: number; client: number; code: string; providerUnique: string };
    history: {
        earning: { amount: number; couponName: string | null; couponPercentage: number; couponPartner: number; couponClient: number; updatedAt: Date; }[];
        withdrawns: { updatedAt: Date; createdAt: Date; amount: number; status: "Pending" | "Approved" | "Rejected"; method: string; account: string; message: string | null }[]
    }
}
export async function CouponProfile(identifier: string): Promise<CouponProfileType | null> {
    try {
        const response: CouponProfileType = {
            earning: { total: 0, orders: 0, upgrade: 0, withdraws: 0, pending: 0 },
            coupon: { percentage: 0, partner: 0, client: 0, code: "", providerUnique: "" },
            history: { earning: [], withdrawns: [] }
        };
        const globalCoupon = await CouponModel.global.find();
        const user: UserType | null = await UserModel.find.unique(identifier, "user.code user.couponOrders order.couponPercentage order.couponPartner order.couponClient order.couponName order.updatedAt user.couponTransactions transaction.couponPercentage transaction.couponPartner transaction.couponClient transaction.couponName transaction.updatedAt user.coupon coupon.custom user.withdraws withdraw.message withdraw.createdAt withdraw.updatedAt");
        if (user && globalCoupon) {
            response.coupon.code = user.code!;
            response.coupon.providerUnique = user.unique!;
            OrderModel.filter.status(user.couponOrders!, "Delivered").map((order) => {
                response.history.earning.push({ amount: order.amount, couponName: order.couponName!, couponPercentage: order.couponPercentage!, couponPartner: order.couponPartner!, couponClient: order.couponClient!, updatedAt: order.updatedAt! })
                response.earning.orders += +((order.couponPartner! / 100) * (order.amount - ((order.couponClient! / 100) * order.amount))).toFixed(0);
            });
            TransactionModel.filter.status(user.couponTransactions!, "Approved").map((transaction) => {
                response.history.earning.push({ amount: transaction.amount, couponName: transaction.couponName!, couponPercentage: transaction.couponPercentage!, couponPartner: transaction.couponPartner!, couponClient: transaction.couponClient!, updatedAt: transaction.updatedAt! })
                response.earning.upgrade += +((transaction.couponPartner! / 100) * (transaction.amount - ((transaction.couponClient! / 100) * transaction.amount))).toFixed(0)
            });
            WithdrawModel.filter.status(user.withdraws!, "Approved").map((withdraw) => {
                response.history.withdrawns.push({ updatedAt: withdraw.updatedAt!, createdAt: withdraw.createdAt!, amount: withdraw.amount, status: withdraw.status, method: withdraw.method, account: withdraw.account, message: withdraw.message! });
            });
            WithdrawModel.filter.status(user.withdraws!, "Approved").map((withdraw) => {
                response.earning.withdraws += withdraw.amount;
            });
            WithdrawModel.filter.status(user.withdraws!, "Pending").map((withdraw) => {
                response.earning.pending += withdraw.amount
            });
            user.withdraws?.map((withdraw) => {
                response.history.withdrawns.push({
                    updatedAt: withdraw.updatedAt!,
                    createdAt: withdraw.createdAt!,
                    amount: withdraw.amount,
                    status: withdraw.status,
                    method: withdraw.method,
                    account: withdraw.account,
                    message: withdraw.message!
                });
            });
            if (user.coupon) {
                if (user.coupon.custom) {
                    response.coupon.percentage = user.coupon.percentage;
                    response.coupon.partner = user.coupon.partner;
                    response.coupon.client = user.coupon.client;
                } else {
                    response.coupon.percentage = globalCoupon.percentage;
                    if (globalCoupon.percentage >= (user.coupon.partner + user.coupon.client)) {
                        response.coupon.partner = user.coupon.partner;
                        response.coupon.client = user.coupon.client;
                    } else {
                        response.coupon.partner = globalCoupon.partner;
                        response.coupon.client = globalCoupon.client;
                    }
                }
            } else {
                response.coupon.percentage = globalCoupon.percentage;
                response.coupon.partner = globalCoupon.partner;
                response.coupon.client = globalCoupon.client;
            }
            response.earning.total = response.earning.upgrade + response.earning.orders;
            response.earning.total = (response.earning.total - (response.earning.pending + response.earning.withdraws));
            return response;
        } else {
            return null;
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function FindUnique(identifier: string, fields?: string): Promise<CouponType | null> {
    try {
        const user: UserType | null = await prisma.user.findUnique({
            where: { code: Sanitizer.toText(identifier) },
            select: UserSelect(`user.coupon ${fields}`),
        });
        if (user) {
            return user.coupon ? CouponReturn(user.coupon, fields) : null;
        } else {
            const coupon: CouponType | null = await prisma.coupon.findUnique({
                where: { authorUnique: Sanitizer.toText(identifier) },
                select: CouponSelect(fields),
            });
            return coupon ? CouponReturn(coupon, fields) : null;
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function FindMany(options: { status?: boolean, global?: boolean; custom?: boolean; fields?: string }): Promise<CouponType[]> {
    try {
        const coupons: CouponType[] = await prisma.user.findMany({
            select: CouponSelect(options.fields),
        });
        if (coupons && coupons.length) {
            return coupons ? CouponReturns(coupons,options.fields) : [];
        } else {
            return []
        }
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}
export async function GlobalCoupon(fields?: string): Promise<CouponType | null> {
    try {
        const global: CouponType | null = await prisma.coupon.findFirst({ where: { global: true }, select: CouponSelect(fields) })
        return global ? CouponReturn(global) : null;
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function MatchCoupon(code: string, fields?: string): Promise<{ client: number; code: string } | null> {
    try {
        const response: { client: number; code: string } = { client: 0, code: "" };
        const user = await UserModel.find.unique(code, `user.code user.coupon ${fields}`);
        if (user) {
            response.code = user.code!;
            if (user.coupon) {
                if (user.coupon.status) {
                    response.client = user.coupon.client;
                    return response;
                } else {
                    return null;
                }
            } else {
                const globalCoupon = await CouponModel.global.find();
                if (globalCoupon) {
                    response.client = globalCoupon.client;
                    return response;
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