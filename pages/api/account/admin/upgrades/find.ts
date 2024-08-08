import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { TransactionModel } from '@/models';

export default async function UpgradeDetailsApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Admin(req, res);
        if (user) {
            const transaction = await TransactionModel.find.unique(body.unique || "", "transaction.unique transaction.invoice transaction.method transaction.accountNumber transaction.plan transaction.quantity transaction.amount transaction.status transaction.extend transaction.name transaction.phone transaction.address transaction.screenshot transaction.product transaction.trxID transaction.couponName transaction.couponPercentage transaction.couponPartner transaction.couponClient transaction.couponProviderUnique transaction.authorUnique transaction.updatedAt transaction.createdAt");
            if (transaction) {
                Response(res, { data: transaction }, 200);
            } else {
                Response(res, { message: "Page not found." }, 404);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}