import { prisma } from '@/db-config';
import { Console } from '@/middleware/http';
import { GroupItemType, GroupItemSelect, GroupItemReturn, GroupItemReturns } from '@/models/groupItem/type';
import { Sanitizer } from 'primepack';
import { ProfileModel } from '@/models';

export async function FindUnique(unique: string): Promise<GroupItemType | null> {
    try {
        const message = await prisma.groupItem.findUnique({
            where: { unique: Sanitizer.toText(unique) },
            select: GroupItemSelect()
        });
        return message ? GroupItemReturn(message) : null;
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function FindProfileGroupItems(profileUnique: string): Promise<GroupItemType[]> {
    try {
        const profile = await ProfileModel.find.unique(profileUnique, `profile.groupItems`);
        return profile?.groupItems ? GroupItemReturns(profile.groupItems) : [];
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}