import { MessageType, MessageSelect, MessageReturns } from '@/models/message/type';
import { ProfileType, ProfileSelect, ProfileReturns } from '@/models/profile/type';
import { AdminMessageType, AdminMessageSelect, AdminMessageReturns } from '@/models/adminMessage/type';
import { OrderType, OrderSelect, OrderReturns } from '@/models/order/type';
import { CouponType, CouponSelect, CouponReturn } from '@/models/coupon/type';
import { TransactionType, TransactionSelect, TransactionReturns } from '@/models/transaction/type';
import { WithdrawType, WithdrawSelect, WithdrawReturns } from '@/models/withdraw/type';

export interface UserType {
    unique: string;
    email: string;
    plan: "FREE" | "PREMIUM" | "BUSINESS";
    phone?: string;
    code?: string;
    ads?: Date;
    password?: string;
    profileLength?: number;
    createdAt?: Date;
    profile?: ProfileType[];
    messages?: MessageType[];
    adminMessages?: AdminMessageType[];
    orders?: OrderType[];
    coupon?: CouponType | null;
    couponOrders?: OrderType[];
    transactions?: TransactionType[];
    couponTransactions?: TransactionType[];
    withdraws?: WithdrawType[];
}
export function UserSelect(fields?: string) {
    return {
        unique: true,
        email: true,
        plan: true,
        phone: fields?.includes("user.phone"),
        code: fields?.includes("user.code"),
        ads: fields?.includes("user.ads"),
        password: fields?.includes("user.password"),
        profileLength: fields?.includes("user.profileLength"),
        createdAt: fields?.includes("user.createdAt"),
        profile: fields?.includes("user.profile") ? { select: ProfileSelect(fields) } : false,
        messages: fields?.includes("user.messages") ? { select: MessageSelect(fields) } : false,
        adminMessages: fields?.includes("user.adminMessages") ? { select: AdminMessageSelect(fields) } : false,
        orders: fields?.includes("user.orders") ? { select: OrderSelect(fields) } : false,
        coupon: fields?.includes("user.coupon") ? { select: CouponSelect(fields) } : false,
        couponOrders: fields?.includes("user.couponOrders") ? { select: OrderSelect(fields) } : false,
        transactions: fields?.includes("user.transactions") ? { select: TransactionSelect(fields) } : false,
        couponTransactions: fields?.includes("user.couponTransactions") ? { select: TransactionSelect(fields) } : false,
        withdraws: fields?.includes("user.withdraws") ? { select: WithdrawSelect(fields) } : false,
    }
}
export function UserReturn(user: UserType, fields?: string) {
    const response: UserType = { unique: "", email: "", plan: "FREE" };
    response.unique = user.unique;
    response.email = user.email;
    response.plan = user.plan;
    if (fields?.includes("user.phone")) { response.phone = user.phone }
    if (fields?.includes("user.code")) { response.code = user.code }
    if (fields?.includes("user.ads")) { response.ads = user.ads }
    if (fields?.includes("user.password")) { response.password = user.password }
    if (fields?.includes("user.profileLength")) { response.profileLength = user.profileLength }
    if (fields?.includes("user.createdAt")) { response.createdAt = user.createdAt }
    if (fields?.includes("user.profile")) { response.profile = ProfileReturns(user.profile!, fields) }
    if (fields?.includes("user.messages")) { response.messages = MessageReturns(user.messages!, fields) }
    if (fields?.includes("user.adminMessages")) { response.adminMessages = AdminMessageReturns(user.adminMessages!, fields) }
    if (fields?.includes("user.orders")) { response.orders = OrderReturns(user.orders!, fields) }
    if (fields?.includes("user.coupon")) { response.coupon = user.coupon ? CouponReturn(user.coupon!, fields) : null }
    if (fields?.includes("user.couponOrders")) { response.couponOrders = OrderReturns(user.couponOrders!, fields) }
    if (fields?.includes("user.transactions")) { response.transactions = TransactionReturns(user.transactions!, fields) }
    if (fields?.includes("user.couponTransactions")) { response.couponTransactions = TransactionReturns(user.couponTransactions!, fields) }
    if (fields?.includes("user.withdraws")) { response.withdraws = WithdrawReturns(user.withdraws!, fields) }
    return response;
}
export function UserReturns(users: UserType[], fields?: string) {
    const response: UserType[] = [];
    users.map((user) => {
        response.push(UserReturn(user, fields));
    });
    return response;
}