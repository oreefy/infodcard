import type { NextApiRequest, NextApiResponse } from 'next';
import { Console, Response } from '@/middleware/http';
import { AdminMessageModel } from '@/models';
import { Auth } from '@/middleware/auth';

export default async function CreateSupportMessageApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Auth(req, res);
        if (user) {
            const body = await JSON.parse(req.body);
            const data = {
                name: body.name,
                number: body.number,
                message: body.message,
            }
            const create = await AdminMessageModel.create(user.email, data);
            if (create) {
                Response(res, { message: "The message has been successfully send." }, 200);
            } else {
                Response(res, { message: "Cannot send the message" }, 500);
            }
        }
    } catch (error: any) {
        Console(error.message);
        Response(res, { message: error.message }, 500);
    }
}