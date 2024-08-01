import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { UserModel, OrderModel } from '@/models';

export default async function FindUserApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Auth(req, res);
        if (user) {
            const userAccount = await UserModel.find.unique(user.email, "user.phone user.orders order.createdAt order.design order.address order.method");
            if (userAccount) {
                Response(res, { phone: userAccount.phone, email: userAccount.email, orders: userAccount.orders }, 200);
            } else {
                Response(res, { message: "Failed to find the user." }, 500);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}