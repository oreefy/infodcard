import type { NextApiRequest, NextApiResponse } from 'next'
import { Console, Response } from '@/middleware/http'
import { MessageModel } from '@/models';
import { Auth } from '@/middleware/auth';

export default async function DeleteMessageApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Auth(req, res);
        if (user) {
            const body = JSON.parse(req.body);
            const deleteMessage = await MessageModel.delete(user.email, body.unique);
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