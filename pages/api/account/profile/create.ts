import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileModel, UserModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';

export default async function MakeProfile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const data: any = {
                link: body.username,
                name: body.name,
                phone: body.phone,
                bio: body.bio,
                profession: body.profession,
                address: body.address,
                avatar: "/default/profile.png",
            }
            const user = await Auth(req, res);
            if (user) {
                const author = await UserModel.find.unique(user.email, "user.profile user.profileLength");
                if (author) {
                    const profile = await ProfileModel.find.unique(body.link);
                    if (!profile) {
                        if ((author.profileLength || 1) > (author.profile?.length || 0)) {
                            const create = await ProfileModel.create(user.email, data)
                            if (create) {
                                Response(res, { errors: [{ type: "other", success: true, message: "The profile has been successfully created." }] }, 200)
                            } else {
                                Response(res, { message: "Faield to create a profile." }, 500);
                            }
                        } else {
                            Response(res, { errors: [{ type: "other", success: false, message: "You have reached your limit for creating profiles. Please upgrade to increase the limit." }] }, 400)
                        }
                    } else {
                        Response(res, { errors: [{ type: "username", success: false, message: "The username is already taken." }] }, 400)
                    }
                } else {
                    Response(res, { message: "Unauthorized" }, 401);
                }

            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}