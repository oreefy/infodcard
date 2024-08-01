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
                lineOne: body.lineOne,
                lineTwo: body.lineTwo,
                lineThree: body.lineThree,
            }
            const user = await Auth(req, res);
            if (user) {
                const profile = await ProfileModel.find.authorProfile(user.email, data.link, "profile.globalBanks");
                if (profile) {
                    if ((profile.globalBanks?.length || 0) >= db.limits.globalBank[user.name as "PREMIUM" | "BUSINESS"]) {
                        Response(res, { errors: [{ type: "other", success: false, message: "Maximum limit " + db.limits.mobileBank[user.name as "PREMIUM" | "BUSINESS"] }] }, 200)
                    } else {
                        const create = await BankModel.global.create(profile.unique, data.bank, data.lineOne, data.lineTwo, data.lineThree);
                        if (create) {
                            Response(res, { errors: [{ type: "other", success: true, message: "The global bank has been successfully created." }] }, 200);
                        } else {
                            Response(res, { message: "No profile fond.Failed to create the global bank." }, 500);
                        }
                    }
                } else {
                    Response(res, { message: "No profile fond." }, 500);
                }
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}