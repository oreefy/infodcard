import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';
import { GroupItemType, GroupItemSelect, GroupItemReturn } from '@/models/groupItem/type';


export async function CreateMany(profileUnique: string, title: string, value: string): Promise<GroupItemType | null> {
    try {
        const create = await prisma.groupItem.create({
            data: {
                profileUnique: profileUnique,
                title: title,
                value: value,
            },
            select: GroupItemSelect(),
        });
        if (create) {
            return GroupItemReturn(create);
        } else {
            return null;
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
