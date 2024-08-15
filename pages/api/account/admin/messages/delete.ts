import type { NextApiRequest, NextApiResponse } from 'next'
import { Console, Response } from '@/middleware/http'
import { ContactModel } from '@/models';
import { Admin } from '@/middleware/auth';

export default async function DeleteMessageApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Admin(req, res);
        if (user) {
            const body = JSON.parse(req.body);
            const deleteMessage = await ContactModel.delete(body.unique);
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