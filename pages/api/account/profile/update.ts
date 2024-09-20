import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { ProfileModel } from '@/models';

export default async function UpdateProfile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const data = {
            profileLink: body.profileLink || undefined,
            link: body.link || undefined,
            name: body.name || undefined,
            phone: body.phone || undefined,
            bio: body.bio || undefined,
            youtube: body.youtube || undefined,
            profession: body.profession || undefined,
            email: body.email || undefined,
            address: body.address || undefined,
            company: body.company || undefined,
            designation: body.designation || undefined,
            companyphone: body.companyphone || undefined,
            companyemail: body.companyemail || undefined,
            website: body.website || undefined,
            corporate: body.corporate || undefined,
            branch: body.branch || undefined,
        }
        const user = await Auth(req, res);
        if (user) {
            const update = await ProfileModel.update(data);
            if (update) {
                Response(res, { profile: update, errors: [] }, 200);
            } else {
                Response(res, { errors: [{ type: "other", success: false, message: "Failed to update the profile." }] }, 500);
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}