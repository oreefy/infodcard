import type { NextApiRequest, NextApiResponse } from 'next';
import { Response, serverError } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { CouponModel } from '@/models';

export default async function EarningApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Auth(req, res);
        if (user) {
            const response = await CouponModel.find.profile(user.email);
            if (response) {
                Response(res, response, 200);
            } else {
                serverError(res, "Failed to fetch the user's coupon data from the server.")
            }
        }
    } catch (error: any) { await serverError(res, error.message); }
}