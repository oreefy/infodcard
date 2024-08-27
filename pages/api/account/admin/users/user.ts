import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { UserModel } from '@/models';

export default async function UserApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Admin(req, res);
        if (user) {
            const user = await UserModel.find.unique(body.unique, "user.unique user.email user.plan user.phone user.code user.ads user.profileLength user.createdAt");
            if (user) {
                Response(res, user, 200);
            } else {
                Response(res, { message: "The user could not be found." }, 404);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}