export interface CouponType {
    unique: string;
    percentage: number;
    partner: number;
    client: number;
    status: boolean;
    global?: boolean;
    custom?: boolean;
    authorUnique?: string;
    createdAt?: Date;
}
export function CouponSelect(fields?: string) {
    return {
        unique: true,
        percentage: true,
        partner: true,
        client: true,
        status: true,
        global: fields?.includes("coupon.global"),
        custom: fields?.includes("coupon.custom"),
        authorUnique: fields?.includes("coupon.authorUnique"),
        createdAt: fields?.includes("coupon.createdAt"),
    }
}
export function CouponReturn(coupon: CouponType, fields?: string) {    
    const response: CouponType = { unique: "", percentage: 0, partner: 0, client: 0, status: false };
    response.unique = coupon.unique
    response.percentage = coupon.percentage
    response.partner = coupon.partner
    response.client = coupon.client
    response.status = coupon.status
    if (fields?.includes("coupon.global")) { response.global = coupon.global }
    if (fields?.includes("coupon.custom")) { response.custom = coupon.custom }
    if (fields?.includes("coupon.authorUnique")) { response.authorUnique = coupon.authorUnique }
    if (fields?.includes("coupon.createdAt")) { response.createdAt = coupon.createdAt }
    return response;
}
export function CouponReturns(coupons: CouponType[], fields?: string) {
    const response: CouponType[] = [];
    coupons.map((coupon) => {
        response.push(CouponReturn(coupon, fields));
    });
    return response;
}