import type { NextApiRequest, NextApiResponse } from 'next'
import { Console, Response } from '@/middleware/http'
import { AdminMessageModel } from '@/models';
import { Auth } from '@/middleware/auth';

export default async function SupportMessagesApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Auth(req, res);
        if (user) {
            const messages = await AdminMessageModel.find.byAuthor(user.email, "adminMessage.number");
            Response(res, { messages: messages }, 200);
        }
    } catch (error: any) {
        Console(error.message);
        Response(res, { message: error.message }, 500);
    }
}