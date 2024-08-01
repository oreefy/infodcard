import { Console } from '@/middleware/http';
import { ProfileType, ProfileSelect, ProfileReturn } from '@/models/profile/type';
import { ProfileModel } from '@/models';
import { prisma } from '@/db-config';

interface ProfileUpdateType {
    profileLink: string;
    link?: string;
    name?: string;
    cover?: string;
    avatar?: string;
    bio?: string;
    youtube?: string;
    phone?: string;
    profession?: string;
    website?: string;
    company?: string;
    companyphone?: string;
    companyemail?: string;
    designation?: string;
    corporate?: string;
    branch?: string;
    email?: string;
    address?: string;
    qr?: string;
}
export async function Update(data: ProfileUpdateType, fields?: string): Promise<ProfileType | null> {
    try {
        const finalData = {
            link: data.link || undefined,
            name: data.name || undefined,
            cover: data.cover || undefined,
            avatar: data.avatar || undefined,
            bio: data.bio || undefined,
            youtube: data.youtube || undefined,
            phone: data.phone || undefined,
            profession: data.profession || undefined,
            website: data.website || undefined,
            company: data.company || undefined,
            companyphone: data.companyphone || undefined,
            companyemail: data.companyemail || undefined,
            designation: data.designation || undefined,
            corporate: data.corporate || undefined,
            branch: data.branch || undefined,
            email: data.email || undefined,
            address: data.address || undefined,
            qr: data.qr || undefined,
        };
        const find = await ProfileModel.find.unique(data.profileLink);
        finalData.link = finalData.link === find?.link ? undefined : data.link;
        if (find) {
            const update = await prisma.profile.update({
                where: { unique: find.unique },
                data: finalData,
                select: ProfileSelect(fields),
            })
            if (update) {
                return ProfileReturn(update, fields);
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}