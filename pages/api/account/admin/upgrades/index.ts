import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { TransactionModel } from '@/models';

export default async function UpgradesApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Admin(req, res);
        if (user) {
            const upgrades = await TransactionModel.find.many({ status: body.status || "", fields: "transaction.unique transaction.invoice transaction.method transaction.accountNumber transaction.plan transaction.quantity transaction.amount transaction.status transaction.extend transaction.name transaction.phone transaction.address transaction.screenshot transaction.product transaction.trxID transaction.couponName transaction.couponPercentage transaction.couponPartner transaction.couponClient transaction.couponProviderUnique transaction.authorUnique transaction.updatedAt transaction.createdAt" });
            Response(res, { data: upgrades }, 200);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}