import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';

export default async function CheckProfile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const user = await Auth(req, res);
            if (user) {
                const profile = await ProfileModel.find.unique(body.link);
                if (!profile) {
                    Response(res, { errors: [{ type: "username", success: true, message: "Available." }] }, 200)
                } else {
                    Response(res, { errors: [{ type: "username", success: false, message: "The username is already taken." }] }, 400)
                }
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}