import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';

export default async function ShopProductApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const products: any = [];
        Response(res, { products }, 200);
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}