import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileModel, UserModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';

export default async function Views(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (await method(req, res)) {
            const user = await Auth(req, res);
            if (user) {
                const author = await UserModel.find.unique(user.email, "user.profileLength");
                const profiles = author ? await ProfileModel.find.authorProfiles(author.unique, "profile.cover profile.avatar profile.bio profile.youtube profile.phone profile.profession profile.website profile.company profile.companyphone profile.companyemail profile.designation profile.corporate profile.branch profile.email profile.address profile.qr profile.socials profile.groupName profile.groupItems profile.products profile.albums profile.services profile.localBanks profile.mobileBanks profile.globalBanks") : [];
                return Response(res, { profiles: profiles, profileLength: author?.profileLength || 0, fulfill: (author?.profileLength || 1) <= (profiles?.length || 0) ? true : false }, 200);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}