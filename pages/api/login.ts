import type { NextApiRequest, NextApiResponse } from 'next';
import { Response, method } from '@/middleware/http';
import { UserModel } from '@/models'
import { Hash } from 'primepack';

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (await method(req, res, "POST")) {
            const body: any = JSON.parse(req.body);
            const input = {
                username: body.username,
                password: body.password,
            }
            const message: string = "The username and password don't match."
            const userPhone: any = await UserModel.find.unique(input.username, "user.password");
            if (userPhone) {
                if (await Hash.compare(input.password, userPhone.password)) {
                    Response(res, { message: "Successfully signed in. Redirecting to the dashboard.", user: { phone: userPhone.phone, email: userPhone.email, name: userPhone.plan } }, 200);
                } else {
                    Response(res, { message: message }, 400);
                }
            } else {
                Response(res, { message: message }, 400);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}