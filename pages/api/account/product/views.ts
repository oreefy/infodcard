import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';

export default async function Views(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (await method(req, res)) {
            const user: any = await Auth(req, res);
            if (user) {
                if (user.name === "PREMIUM" || user.name === "BUSINESS") {
                    const profiles = await ProfileModel.find.authorProfiles(user.email);
                    return Response(res, { profiles: profiles }, 200);
                } else {
                    return Response(res, { message: "Upgrade your plan." }, 400);
                }
            } else {
                await Response(res, { message: "User not authorized." }, 500);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}