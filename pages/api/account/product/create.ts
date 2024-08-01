import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileModel, ProductModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import db from '@/database';

export default async function MakeProduct(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const data = {
                link: body.link,
                title: body.title || "",
                message: body.message || "",
                price: body.price || "",
            }
            const user = await Auth(req, res);
            if (user) {
                const find = await ProfileModel.find.authorProfile(user.email, data.link, "profile.products");
                if (find) {
                    if ((find.products?.length || 0) >= db.limits.product[user.name as "PREMIUM" | "BUSINESS"]) {
                        Response(res, { errors: [{ type: "other", success: false, message: "Maximum limit " + db.limits.product[user.name as "PREMIUM" | "BUSINESS"] }] }, 200);
                    } else {
                        const create = await ProductModel.create(find.unique, data.title, data.price, data.message);
                        if (create) {
                            Response(res, { errors: [{ type: "other", success: true, message: "The product has been successfully created." }] }, 200)
                        } else {
                            Response(res, { message: "Faield to create a product." }, 500);
                        }
                    }
                } else {
                    Response(res, { message: "Faield to create a product." }, 500);
                }
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}