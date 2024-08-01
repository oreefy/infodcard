import type { NextApiRequest, NextApiResponse } from 'next';
import { BankModel, ProfileModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import db from '@/database';

export default async function MakeProduct(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const data = {
                link: body.link,
                bank: body.bank,
                name: body.name,
                number: body.number,
                branch: body.branch,
            }
            const user = await Auth(req, res);
            if (user) {
                const profile = await ProfileModel.find.authorProfile(user.email, data.link, "profile.localBanks");
                if (profile) {
                    if ((profile.localBanks?.length || 0) >= db.limits.localBank[user.name as "PREMIUM" | "BUSINESS"]) {
                        Response(res, { errors: [{ type: "other", success: false, message: "Maximum limit " + db.limits.mobileBank[user.name as "PREMIUM" | "BUSINESS"] }] }, 200)
                    } else {
                        const create = await BankModel.local.create(profile.unique, data.bank, data.name, data.number, data.branch);
                        if (create) {
                            Response(res, { errors: [{ type: "other", success: true, message: "The local bank has been successfully created." }] }, 200);
                        } else {
                            Response(res, { message: "No profile fond.Failed to create the local bank." }, 500);
                        }
                    }
                } else {
                    Response(res, { message: "No profile fond." }, 500);
                }
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}