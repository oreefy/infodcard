import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { TransactionModel } from '@/models';

export default async function TransactionsApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user: any = await Auth(req, res);
        if (user) {
            const trxs = await TransactionModel.find.all();
            Response(res, { transactions: trxs }, 200);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}