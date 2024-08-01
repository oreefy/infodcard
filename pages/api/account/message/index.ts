import type { NextApiRequest, NextApiResponse } from 'next';
import { method, Console, Response } from '@/middleware/http';
import { MessageModel } from '@/models';
import { Auth } from '@/middleware/auth';

export default async function MessageApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const data = {
                link: body.link,
                type: body.type,
                name: body.name,
                number: body.number,
                message: body.message,
            }
            switch (body.type) {
                case "get":
                    const user = await Auth(req, res);
                    if (user) {
                        const messages = await MessageModel.find.byAuthor(user.email, "message.number user.messages");
                        Response(res, { messages: messages }, 200);
                    }
                    break;
                case "read":
                    break;
                case "readall":
                    break;
                case "deleteall":
                    break;
                case "deleteall":
                    break;
                default:
                    const create = await MessageModel.create(body.link, body.name, body.number, body.message);
                    if (create) {
                        Response(res, { message: "The message has been successfully send." }, 200);
                    } else {
                        Response(res, { message: "Cannot create message" }, 500);
                    }
                    break;
            }
        }
    } catch (error: any) {
        Console(error.message);
        Response(res, { message: error.message }, 500);
    }
}