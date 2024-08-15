import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { CouponModel, UserModel } from '@/models';

export default async function CouponsApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Admin(req, res);
        if (user) {
            const users = await UserModel.find.many({ fields: "user.code user.coupon coupon.global coupon.custom" });
            const global = await CouponModel.global.find();
            Response(res, { data: users, global }, 200);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}