import type { NextApiRequest, NextApiResponse } from 'next';
import { BankModel, ProfileModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { Sanitizer } from 'primepack';

export default async function DeleteLocalBankApi(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const data = { link: Sanitizer.toPath(body.link), unique: Sanitizer.toPath(body.unique) }
            const user = await Auth(req, res);
            if (user) {
                const profile = await ProfileModel.find.authorProfile(user.email, data.link, "profile.localBanks");
                if (profile) {
                    const deleted = await BankModel.local.delete(profile.unique, data.unique);
                    if (deleted) {
                        Response(res, { message: "The local bank has been successfully deleted." }, 200);
                    } else {
                        Response(res, { message: "Failed to delete local bank" }, 500);
                    }
                } else {
                    Response(res, { message: "No profile found to delete profile" }, 500);
                }
            }

        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }

}