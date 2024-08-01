import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';

export default async function UpdateProfile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const data = {
                profileLink: body.profileLink,
                link: body.link || undefined,
                name: body.name || undefined,
                phone: body.phone || undefined,
                bio: body.bio || undefined,
                youtube: body.youtube || undefined,
                profession: body.profession || undefined,
                website: body.website || undefined,
                company: body.company || undefined,
                companyphone: body.companyphone || undefined,
                companyemail: body.companyemail || undefined,
                designation: body.designation || undefined,
                corporate: body.corporate || undefined,
                branch: body.branch || undefined,
                email: body.email || undefined,
                address: body.address || undefined,
            }            
            const user = await Auth(req, res);
            if (user) {
                const authorProfile = await ProfileModel.find.authorProfile(user.email, body.profileLink);
                if (authorProfile) {
                    const checkProfile = async (identifier: string): Promise<boolean> => {
                        const check = await ProfileModel.find.unique(identifier);
                        return check ? true : false;
                    }
                    const check = authorProfile.link !== data.link ? (await checkProfile(data.link)) : false;
                    if (!check) {
                        const update = await ProfileModel.update(data, "profile.cover profile.avatar profile.bio profile.youtube profile.phone profile.profession profile.website profile.company profile.companyphone profile.companyemail profile.designation profile.corporate profile.branch profile.email profile.address profile.qr");
                        if (update) {
                            Response(res, { profile: update, errors: [{ type: "other", success: true, message: "The profile has been successfully updated." }] }, 200)
                        } else {
                            Response(res, { message: "Faield to create a profile." }, 500);
                        }
                    } else {
                        Response(res, { errors: [{ type: "username", success: false, message: "The username is already taken." }] }, 400)
                    }
                } else {
                    Response(res, { errors: [{ type: "other", success: false, message: "Unauthorized" }] }, 401)
                }
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}