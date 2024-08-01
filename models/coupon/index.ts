import { FindUnique, GlobalCoupon, CouponProfile, MatchCoupon } from '@/models/coupon/find';
import { Update } from '@/models/coupon/update';
import { CouponGenerator } from '@/models/coupon/others';

const CouponModel = {
    global: {
        find: GlobalCoupon,
    },
    find: {
        unique: FindUnique,
        profile: CouponProfile,
        match: MatchCoupon,
    },
    update: Update,
    couponGenerator: CouponGenerator,
}

export default CouponModel;