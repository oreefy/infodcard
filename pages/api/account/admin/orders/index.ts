import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { OrderModel } from '@/models';

export default async function OrdersApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Admin(req, res);
        if (user) {
            const orders = await OrderModel.find.many({ status: body.status || "", fields: "order.createdAt order.status order.invoice order.product order.amount order.phone order.method order.trxID order.couponClient" });
            Response(res, { data: orders }, 200);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}