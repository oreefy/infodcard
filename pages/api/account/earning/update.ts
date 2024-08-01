import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { CouponModel } from '@/models';

export default async function EarningUpdateApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Auth(req, res);
        if (user) {
            const body: any = JSON.parse(req.body);
            const data = {
                partner: typeof body.partner === "number" ? body.partner : 0,
                client: typeof body.client === "number" ? body.client : 0,
                code: body.code,
            }
            const find = await CouponModel.find.profile(user.email);
            if (find) {                
                if (find.coupon.code === data.code) {
                    const update = await CouponModel.update(user.email, { partner: data.partner, client: data.client });     
                    if (update) {
                        const profile = await CouponModel.find.profile(user.email);                        
                        Response(res, profile!, 200);
                    } else {
                        Response(res, { message: "Failed to update the user's coupon." }, 500)
                    }
                } else {
                    const check = await CouponModel.find.match(data.code);
                    if (!check) {
                        const updated = await CouponModel.update(user.email, data);
                        if (updated) {
                            const profile = await CouponModel.find.profile(user.email);
                            Response(res, profile!, 200);
                        } else {
                            Response(res, { message: "Failed to update the user's coupon." }, 500)
                        }
                    } else {
                        Response(res, { message: "The coupon name already exists." }, 409);
                    }
                }
            } else {
                Response(res, { message: "Failed to find the user's coupon." }, 500);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}