import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { OrderModel } from '@/models';

export default async function OrderDetailsApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Admin(req, res);
        if (user) {
            const order = await OrderModel.find.unique(body.unique || "", "order.unique order.status order.invoice order.product order.amount order.name order.design order.front order.back order.accountNumber order.method order.phone order.address order.screenshot order.trxID order.text order.couponName order.couponPercentage order.couponPartner order.couponClient order.couponProviderUnique order.authorUnique order.updatedAt order.createdAt");
            if (order) {
                Response(res, { data: order }, 200);
            } else {
                Response(res, { message: "Page not found." }, 404);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}