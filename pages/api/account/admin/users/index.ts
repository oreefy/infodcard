import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { UserModel } from '@/models';

export default async function UsersApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Admin(req, res);
        if (user) {
            const users = await UserModel.find.many({ plan: body.plan || "", fields: "user.unique user.email user.plan user.phone user.code user.ads user.profileLength user.createdAt" });
            Response(res, { users: users }, 200);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}