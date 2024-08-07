import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { OrderModel } from '@/models';

export default async function WithdrawnsUpdateApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Admin(req, res);
        if (user) {
            const update = await OrderModel.update(body.unique || "", { status: body.status as "Pending" | "Processing" | "Shipping" | "Delivered" | "Rejected" | "Hold" | "Canceled" });
            update ? Response(res, { message: "The order has been successfully updated." }, 200) : Response(res, { message: "Failed to update the order." }, 500);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}