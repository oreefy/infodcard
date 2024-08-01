import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { Auth } from '@/middleware/auth';
import { ProfileModel, GroupItemModel } from '@/models';

export default async function CustomApiPage(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const user = await Auth(req, res);
        if (user) {
            const data = {
                email: user.email,
                profile: body.profile,
                group: body.group,
                itemOne: { unique: body.itemOne.unique, title: body.itemOne.title, value: body.itemOne.value },
                itemTwo: { unique: body.itemTwo.unique, title: body.itemTwo.title, value: body.itemTwo.value },
                itemThree: { unique: body.itemThree.unique, title: body.itemThree.title, value: body.itemThree.value },
                itemFour: { unique: body.itemFour.unique, title: body.itemFour.title, value: body.itemFour.value },
                itemFive: { unique: body.itemFive.unique, title: body.itemFive.title, value: body.itemFive.value },
                itemSix: { unique: body.itemSix.unique, title: body.itemSix.title, value: body.itemSix.value },
                itemSeven: { unique: body.itemSeven.unique, title: body.itemSeven.title, value: body.itemSeven.value },
            }
            const checkProfile = await ProfileModel.find.authorProfile(data.email, data.profile, "profile.groupItem");
            if (checkProfile) {
                const toCreate: { title: string, value: string }[] = [];
                const toUpdate: { unique: string; title?: string, value?: string }[] = [];
                if (data.itemOne.unique) {
                    toUpdate.push({ unique: data.itemOne.unique, title: data.itemOne.title, value: data.itemOne.value });
                } else {
                    toCreate.push({ title: data.itemOne.title, value: data.itemOne.value });
                }
                if (data.itemTwo.unique) {
                    toUpdate.push({ unique: data.itemTwo.unique, title: data.itemTwo.title, value: data.itemTwo.value });
                } else {
                    toCreate.push({ title: data.itemTwo.title, value: data.itemTwo.value });
                }
                if (data.itemThree.unique) {
                    toUpdate.push({ unique: data.itemThree.unique, title: data.itemThree.title, value: data.itemThree.value });
                } else {
                    toCreate.push({ title: data.itemThree.title, value: data.itemThree.value });
                }
                if (data.itemFour.unique) {
                    toUpdate.push({ unique: data.itemFour.unique, title: data.itemFour.title, value: data.itemFour.value });
                } else {
                    toCreate.push({ title: data.itemFour.title, value: data.itemFour.value });
                }
                if (data.itemFive.unique) {
                    toUpdate.push({ unique: data.itemFive.unique, title: data.itemFive.title, value: data.itemFive.value });
                } else {
                    toCreate.push({ title: data.itemFive.title, value: data.itemFive.value });
                }
                if (data.itemSix.unique) {
                    toUpdate.push({ unique: data.itemSix.unique, title: data.itemSix.title, value: data.itemSix.value });
                } else {
                    toCreate.push({ title: data.itemSix.title, value: data.itemSix.value });
                }
                if (data.itemSeven.unique) {
                    toUpdate.push({ unique: data.itemSeven.unique, title: data.itemSeven.title, value: data.itemSeven.value });
                } else {
                    toCreate.push({ title: data.itemSeven.title, value: data.itemSeven.value });
                }
                const updated = await GroupItemModel.updateMany(checkProfile.unique, { title: data.group || "", create: toCreate, update: toUpdate });
                if (updated) {
                    Response(res, { message: "Custom fields have been successfully updated." }, 200);
                } else {
                    Response(res, { message: "Failed to update the custom fields." }, 500);
                }
            } else {
                Response(res, { message: "No profile was found. First, create a profile to update the custom fields." }, 400)
            }
        } else {
            Response(res, { message: "Unauthorised." }, 401);
        }
    } catch (error: any) { await Response(res, { message: error.message }); }
}