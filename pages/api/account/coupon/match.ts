import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { CouponModel } from '@/models';

export default async function CouponMatchApiPage(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const find = await CouponModel.find.match(body.code);
        if (find) {
            Response(res, find, 200);
        } else {
            Response(res, { message: "Invalid Coupon Code." }, 400);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}