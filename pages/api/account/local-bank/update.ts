import type { NextApiRequest, NextApiResponse } from 'next';
import { BankModel, ProfileModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';

export default async function UpdateProfilePage(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const data = {
                link: body.link,
                unique: body.unique,
                bank: body.bank,
                name: body.name,
                number: body.number,
                branch: body.branch,
            }
            const user = await Auth(req, res);
            if (user) {
                const profile = await ProfileModel.find.authorProfile(user.email, data.link);
                if (profile) {
                    const update = await BankModel.local.update(profile.unique, data.unique, data.bank, data.name, data.number, data.branch);
                    if (update) {
                        Response(res, { errors: [{ type: "other", success: true, message: "The local bank has been successfully updated." }] }, 200)
                    } else {
                        Response(res, { message: "Faield to update a local bank" }, 500);
                    }
                } else {
                    Response(res, { errors: [{ type: "other", success: false, message: "Inertnal Server Error." }] }, 500)
                }
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}