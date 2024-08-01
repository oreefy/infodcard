import type { NextApiRequest, NextApiResponse } from 'next';
import { ProfileModel, ProductModel } from '@/models';
import { Response, method } from '@/middleware/http';
import { Auth } from '@/middleware/auth';

export default async function UpdateProfilePage(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        if (await method(req, res)) {
            const data = {
                link: body.link || "",
                unique: body.unique || "",
                title: body.title || "",
                message: body.message || "",
                price: body.price || "",
            }
            const user = await Auth(req, res);
            if (user) {
                const find = await ProfileModel.find.authorProfile(user.email, data.link, "profile.products");
                if (find) {
                    const update = await ProductModel.update(find.unique, data.unique, data.title, data.price, data.message);
                    if (update) {
                        Response(res, { errors: [{ type: "other", success: true, message: "The product has been successfully updated." }] }, 200)
                    } else {
                        Response(res, { message: "Faield to update a product" }, 500);
                    }
                } else {
                    Response(res, { errors: [{ type: "other", success: false, message: "Inertnal Server Error." }] }, 500)
                }
            }
        }
    } catch (error: any) { await Response(res, { message: error.message }, 500); }
}