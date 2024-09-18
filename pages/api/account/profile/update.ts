import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import Validate from '@/middleware/validate';
import File from '@/middleware/file';

export const config = { api: { bodyParser: false } };

export default async function UpdateProfile(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await Auth(req, res);
        if (user) {
            const body = await Validate(req, [{ field: "cover", maxFiles: 1, maxTotalFileSize: 5 * 2024 * 2024, extensions: ['.png', '.jpg', '.jpeg'] }]);
            if (body.validation) {
                await File.upload("/public/uploads", body.files[0].uploads);
                Response(res, { message: "Your profile photo has been successfully updated." }, 200);
            } else {
                await File.cleanup(body.files[0].uploads);
                Response(res, { message: "The data was not structured.", errors: body }, 406);
            };
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}