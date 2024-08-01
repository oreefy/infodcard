import type { NextApiRequest, NextApiResponse } from 'next';
import { method, Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';

export default async function DashboardApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (await method(req, res)) {
            const user = await Auth(req, res);
            if (user) {
                Response(res, { profile: "" }, 200);
            } else {
                Response(res, { profile: "" }, 200);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}