import type { NextApiRequest, NextApiResponse } from 'next';
import { Response, method, } from '@/middleware/http';
import { UserModel } from '@/models';

export default async function Register(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body: any = JSON.parse(req.body);
        const input = {
            phone: body.phone,
            email: body.email,
            password: body.password,
        }
        if (await method(req, res)) {
            if (await UserModel.find.unique(input.phone)) {
                Response(res, { message: "The phone number already exists." }, 400)
            } else {
                if (await UserModel.find.unique(input.email)) {
                    Response(res, { message: "The email address already exists." }, 400)
                } else {
                    if (await UserModel.create(input.phone, input.email, input.password)) {
                        Response(res, { message: "Your account has been successfully created." }, 200);
                    } else {
                        Response(res, { message: "Faild to create a new user" }, 500);
                    }
                }
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}