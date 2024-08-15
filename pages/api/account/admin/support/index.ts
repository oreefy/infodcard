import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { AdminMessageModel } from '@/models';

export default async function MessagesApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Admin(req, res);
        if (user) {
            const messages = await AdminMessageModel.find.many({ fields: "adminMessage.number adminMessage.read adminMessage.authorUnique adminMessage.createdAt" });
            Response(res, { data: messages }, 200);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}