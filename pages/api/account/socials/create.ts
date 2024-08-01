import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileModel, SocialModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';

export default async function MakeProfile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const data = {
                title: body.data.title,
                link: body.data.link,
                type: body.data.type,
                logo: body.data.logo,
            }
            const user = await Auth(req, res);
            if (user) {                
                const author = await ProfileModel.find.authorProfile(user.email, body.data.profile);                
                if (author) {
                    const create = await SocialModel.create(author.link, data);
                    if (create) {
                        Response(res, { socials: create, message: "The social profile successfully added." }, 200);
                    } else {
                        Response(res, { message: "Failed to add the social media profile." }, 500);
                    }
                } else {
                    Response(res, { message: "Unauthorized" }, 500);
                }

            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}