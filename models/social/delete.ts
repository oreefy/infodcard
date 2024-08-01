import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { SocialType, SocialSelect, SocialReturn } from "@/models/social/type";
import { UserModel, ProfileModel, SocialModel } from "@/models";
import { Sanitizer } from "primepack";

export async function Delete(authorIdentifier: string, profileLink: string, socialUnique: string): Promise<boolean> {
    try {
        const find = await SocialModel.find.unique(socialUnique);
        if (find) {
            const profile = await ProfileModel.find.unique(profileLink, "profile.authorUnique");
            if (profile) {
                if (profile.link === profileLink) {
                    const user = await UserModel.find.unique(authorIdentifier);
                    if (user) {
                        if (user.unique === profile.authorUnique) {
                            const remove = await prisma.social.delete({ where: { unique: Sanitizer.toText(socialUnique) } })
                            if (remove) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error: any) {
        Console(error.message);
        return false;
    }
}