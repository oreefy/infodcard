import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { WithdrawModel, CouponModel } from '@/models';

export default async function CreateUserWithdrawApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Auth(req, res);
        if (user) {
            const body: any = JSON.parse(req.body);
            const data = { method: body.method, number: body.number, tk: typeof +body.tk === "number" ? +body.tk : 0, message: body.message }
            const balance = await CouponModel.find.profile(user.email);
            if ((balance?.earning.total || 0) >= data.tk) {
                const create = await WithdrawModel.create(user.email, data);                
                if (create) {
                    Response(res, { message: "The withdrawal request has been successfully submitted." }, 200);
                } else {
                    Response(res, { message: "Failed to create the user's withdraw request." }, 500);
                }
            } else {
                Response(res, { message: "You don't have Insufficient fund." }, 400);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}