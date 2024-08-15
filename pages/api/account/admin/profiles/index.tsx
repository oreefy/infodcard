import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Admin } from '@/middleware/auth';
import { ProfileModel } from '@/models';

export default async function ProfilesApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Admin(req, res);
        if (user) {
            const data = await ProfileModel.find.many({ fields: "profile.avatar profile.authorUnique profile.createdAt" });
            Response(res, { data }, 200);
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}