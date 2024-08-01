import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Guest } from '@/middleware/auth';
import { OrderModel } from '@/models';

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

export default async function MakeOrder(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Guest(req, res);
        const data = {
            email: user?.email || undefined,
            price: body.price,
            coupon: body.coupon,
            name: body.name,
            phone: body.phone,
            address: body.address,
            product: body.title,
            design: body.design,
            front: body.front,
            back: body.back,
            method: body.method,
            trxID: body.trxID,
            provider: {
                logo: body.provider.logo,
                provider: body.provider.provider,
                number: body.provider.number,
            }
        }
        const create = await OrderModel.create(data);
        if (create) {
            Response(res, { message: "Your order has been successfully created." }, 200);
        } else {
            Response(res, { message: "Failed to create order" }, 500);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}