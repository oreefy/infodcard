import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { WithdrawModel } from '@/models';

export default async function WithdrawnsUpdateApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Admin(req, res);
        if (user) {
            const update = await WithdrawModel.update(body.unique || "", { status: body.status as "Pending" | "Approved" | "Rejected" });
            update ? Response(res, { message: "Successfully updated the withdraw status." }, 200) : Response(res, { message: "Failed to update the withdraw status." }, 500);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}