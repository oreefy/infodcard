import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { SocialType, SocialSelect, SocialReturn } from "@/models/social/type";
import { ProfileModel } from "@/models";

interface SocialCreateType {
    title: string;
    link: string;
    type: boolean;
    logo: string;
}

export async function Create(profileLink: string, data: SocialCreateType): Promise<SocialType | null> {
    try {
        const profile = await ProfileModel.find.unique(profileLink);
        if (profile) {
            const create = await prisma.social.create({
                select: SocialSelect(),
                data: {
                    title: data.title,
                    link: data.link,
                    type: data.type,
                    logo: data.logo,
                    authorUnique: profile.unique
                }
            });
            if (create) {
                return SocialReturn(create);
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