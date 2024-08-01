import { Console } from '@/middleware/http';
import { ProfileType } from '@/models/profile/type';
import { UserSelect } from '@/models/user/type';
import { ProfileModel } from '@/models';
import qr from 'qrcode';
import { prisma } from '@/db-config';

interface CreateType {
    link: string;
    name: string;
    bio?: string;
    phone?: string;
    profession?: string;
    address?: string;
}

export async function Create(email: string, data: CreateType, fields?: string): Promise<ProfileType | null> {
    try {
        const finalData = { ...data, qr: "" }
        if (await ProfileModel.find.unique(data.link)) {
            return null;
        } else {
            try {
                const qrcode = await qr.toDataURL("https://www.infodcard.com/p/" + data.link);
                if (qrcode) {
                    finalData.qr = qrcode;
                }
            } catch (error: any) { Console(error.message) }
            const create = await prisma.user.update({
                where: { email: email },
                data: { profile: { create: finalData } },
                select: UserSelect(`profile`)
            })
            if (create) {
                return await ProfileModel.find.unique(finalData.link, fields);
            } else {
                return null;
            }
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}