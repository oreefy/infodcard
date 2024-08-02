import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { UserModel } from '@/models';

export default async function UsersApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Admin(req, res);
        if (user) {
            const users = await UserModel.find.many("user.unique user.email user.plan user.phone user.code user.ads user.password user.profileLength user.createdAt user.profile user.messages user.adminMessages user.orders user.coupon user.couponOrders user.transactions user.couponTransactions user.withdraws");
            Response(res, { users: users }, 200);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}