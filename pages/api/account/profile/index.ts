import type { NextApiResponse, NextApiRequest } from 'next';
import { method, Response } from '@/middleware/http';
import { ProfileModel } from '@/models';

export default async function Profile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const profile = await ProfileModel.find.unique(body.link, `profile.bio profile.cover profile.avatar profile.socials profile.name profile.profession profile.address profile.phone profile.email profile.youtube profile.company profile.designation profile.companyemail profile.companyphone profile.corporate profile.branch profile.website profile.groupName profile.groupItems profile.companyphone profile.products profile.services profile.albums profile.mobileBanks profile.localBanks profile.globalBanks profile.qr profile.phone`);
            if (profile) {
                Response(res, profile, 200);
            } else {
                Response(res, { message: "The profile was not found." }, 404);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}