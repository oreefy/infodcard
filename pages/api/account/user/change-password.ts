import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { UserModel } from '@/models';
import { Hash } from 'primepack';

export default async function ChangePasswordApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Auth(req, res);
        if (user) {
            const userAccount = await UserModel.find.unique(user.email, "user.password");
            if (userAccount) {
                if (await Hash.compare(body.current, userAccount.password || "")) {
                    const update = await UserModel.password.change(userAccount.unique, body.new);
                    if (update) {
                        Response(res, { message: "The password has been successfully updated." }, 200);
                    } else {
                        Response(res, { message: "Failed to update the user." }, 500);
                    }
                } else {
                    Response(res, { message: "The current password does not match." }, 400);
                }
            } else {
                Response(res, { message: "The account does not exist." }, 401);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}