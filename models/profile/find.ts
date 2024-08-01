import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { ProfileType, ProfileSelect, ProfileReturn, ProfileReturns } from '@/models/profile/type';
import { Sanitizer } from "primepack";
import { UserModel } from "@/models";

export async function FindUnique(identifier: string, fields?: string): Promise<ProfileType | null> {
    try {
        let find: ProfileType | null = null;
        find = await prisma.profile.findUnique({ where: { unique: Sanitizer.toText(identifier) }, select: ProfileSelect(fields) });
        if (find) {
            return ProfileReturn(find, fields);
        } else {
            find = await prisma.profile.findUnique({ where: { link: Sanitizer.toText(identifier) }, select: ProfileSelect(fields) });
            if (find) {
                return ProfileReturn(find, fields);
            } else {
                return null;
            }
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function FindByAuthor(authorIdentifier: string, fields?: string): Promise<ProfileType[]> {
    try {
        const user = await UserModel.find.unique(authorIdentifier);
        const findAll = user ? await prisma.profile.findMany({ where: { authorUnique: user.unique }, select: ProfileSelect(fields) }) : [];
        return ProfileReturns(findAll, fields);
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}
export async function AuthorProfile(authorIdentifier: string, profileIdentifier: string, fields?: string): Promise<ProfileType | null> {
    try {
        let response: ProfileType | null = null;
        const author = await UserModel.find.unique(authorIdentifier, `user.profile ${fields}`);
        if (author) {
            const profile = author.profile?.find((authorProfile) => ((authorProfile.unique === Sanitizer.toText(profileIdentifier)) || (authorProfile.link === Sanitizer.toText(profileIdentifier) ? true : false)));
            response = profile ? profile : null;
        }
        return response ? ProfileReturn(response, fields) : null;
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}