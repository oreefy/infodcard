import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { TransactionModel } from '@/models';

export default async function AccountUpgradeApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Auth(req, res);
        const body = JSON.parse(req.body);
        if (user) {
            const data = {
                plan: body.plan as "FREE" | "PREMIUM" | "BUSINESS",
                price: typeof body.price === "number" ? body.price : 0,
                quantity: typeof body.quantity === "number" ? body.quantity : 0,
                extend: typeof body.quantity ? true : false,
                coupon: body.coupon.toUpperCase(),
                name: body.name,
                phone: body.phone,
                address: body.address,
                product: body.product,
                method: body.method,
                trxID: body.trxID,
                provider: {
                    logo: body.provider.logo,
                    provider: body.provider.provider,
                    number: body.provider.number,
                }
            }            
            if (!(await TransactionModel.checkStatus(user.email, body.plan))) {
                const update = await TransactionModel.create(user.email, data);
                if (update) {
                    Response(res, { message: "Your upgrade plan has been successfully submitted." }, 200);
                } else {
                    Response(res, { message: "Failed to update plan from free to premium" }, 500);
                }
            } else {
                Response(res, { message: "You have already submitted. however, we will notify you by email soon." }, 400);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}