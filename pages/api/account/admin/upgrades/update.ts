import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { TransactionModel } from '@/models';

export default async function UpgradeUpdateApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Admin(req, res);
        if (user) {
            const update = await TransactionModel.update(body.unique || "", { status: body.status as "Pending" | "Approved" | "Rejected" });
            update ? Response(res, { message: "The upgrade has been successfully updated." }, 200) : Response(res, { message: "Failed to update the upgrade." }, 500);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}