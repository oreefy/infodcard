import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { UserModel } from '@/models';

export default async function UpdateUserApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Auth(req, res);
        if (user) {
            const update = await UserModel.update(user.email, {
                phone: body.phone, 
                email: body.email
            });
            if (update) {
                Response(res, { message: "The user has been successfully updated.", ...update }, 200);
            } else {
                Response(res, { message: "Failed to update the user." }, 500);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}