import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileModel, SocialModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';

export default async function DeleteProfile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const user = await Auth(req, res);
            if (user) {
                const remove = await SocialModel.delete(user.email, body.link, body.unique);
                if (remove) {
                    Response(res, { message: "The social profile has been successfully deleted." }, 200);
                } else {
                    Response(res, { message: "Failed to delete the social media profile." }, 500);
                }
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}