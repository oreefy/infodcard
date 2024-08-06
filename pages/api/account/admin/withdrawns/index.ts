import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { WithdrawModel } from '@/models';

export default async function WithdrawnsApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Admin(req, res);
        if (user) {
            const withdrawns = await WithdrawModel.find.many({ status: body.status || "", fields: "withdraw.unique withdraw.amount withdraw.status withdraw.method withdraw.account withdraw.message withdraw.authorUnique withdraw.updatedAt withdraw.createdAt" });
            Response(res, { data: withdrawns }, 200);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}