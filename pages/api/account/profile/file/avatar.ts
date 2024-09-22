import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import Validate from '@/middleware/validate';
import File from '@/middleware/file';
import { ProfileModel } from '@/models';

export const config = { api: { bodyParser: false } };

export default async function ProfileFile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Auth(req, res);
        if (user) {
            const body = await Validate(req, [{ field: "avatar", maxFiles: 1, maxFileSize: 5 * 2024 * 2024, extensions: ['.png', '.jpg', '.jpeg'] }]);
            if (body.validation) {
                const update = await File.upload("/public/uploads/avatars", body.files[0].uploads);
                if (update.status) {
                    const queryProfile = await ProfileModel.find.unique(body.fields.link[0], "profile.cover profile.avatar");
                    if (queryProfile?.avatar !== "/default/cover.png") {
                        File.delete("/public" + queryProfile?.avatar);
                    }
                    const profile = await ProfileModel.update({ profileLink: body.fields.link[0], avatar: "/uploads/avatars/" + update.uploads[0].filename }, "profile.cover profile.avatar");
                    if (profile) {
                        Response(res, { profile: profile, message: "The media has been successfully updated." }, 200);
                    } else {
                        Response(res, { message: "Failed to update the media." }, 500);
                    }
                } else {
                    Response(res, { message: "Failed to update the media." }, 500);
                }
            } else {
                await File.cleanup(body.files[0].uploads);
                Response(res, { message: "The media was not structured." }, 400);
            };
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}