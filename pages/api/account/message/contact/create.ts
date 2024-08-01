import type { NextApiRequest, NextApiResponse } from 'next'
import { method, Console, Response } from '@/middleware/http'
import { ContactModel } from '@/models';

export default async function CreateContactMessageApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (await method(req, res)) {
            const body = await JSON.parse(req.body);
            const data = {
                name: body.name || "",
                number: body.number || "",
                email: body.email || "",
                subject: body.subject || "",
                message: body.message || "",
            }
            const create = await ContactModel.create(data);
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