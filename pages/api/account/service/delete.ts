import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileModel, ServiceModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { Sanitizer } from 'primepack';

export default async function DeleteService(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const data = { link: Sanitizer.toPath(body.link || ""), unique: Sanitizer.toPath(body.unique || "") }
        if (await method(req, res)) {
            const user = await Auth(req, res);
            if (user) {
                const find = await ProfileModel.find.authorProfile(user.email, data.link);
                if (find) {
                    const deleted = await ServiceModel.delete(find.unique, data.unique);
                    if (deleted) {
                        Response(res, { message: "The service has been successfully deleted." }, 200);
                    } else {
                        Response(res, { message: "Failed to delete service." }, 500);
                    }
                } else {
                    Response(res, { message: "Unauthorized." }, 500);
                }
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}