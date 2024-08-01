import type { NextApiRequest, NextApiResponse } from 'next'
import { Console, Response } from '@/middleware/http';
import { AdminMessageModel } from '@/models';
import { Auth } from '@/middleware/auth';

export default async function DeleteSupportMessageApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = await JSON.parse(req.body);
        const user = await Auth(req, res);
        if (user) {
            const deleteMessage = await AdminMessageModel.delete(user.email, body.unique);
            if (deleteMessage) {
                Response(res, { message: "The message has been successfully deleted." }, 200);
            } else {
                Response(res, { message: "Failed to delete user message." }, 400);
            }
        }
    } catch (error: any) {
        Console(error.message);
        Response(res, { message: error.message }, 500);
    }
}