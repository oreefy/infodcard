import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';


export async function UpdateMany(profileUnique: string, data: { title: string; create: { title: string, value: string }[]; update: { unique: string; title?: string, value?: string }[]; }): Promise<boolean> {
    try {
        const toCreate: { data: { title: string, value: string }[] } = { data: [] };
        const toUpdate: { where: { unique: string }; data: { title: string, value: string } }[] = [];
        data.create.map((create) => {
            if (create.title && create.value) {
                toCreate.data.push({ title: create.title, value: create.value });
            }
        });
        data.update.map((update) => {
            if (update.unique) {
                toUpdate.push({ where: { unique: update.unique }, data: { title: update.title || "", value: update.value || "" } })
            }
        });
        const create = await prisma.profile.update({
            where: { unique: profileUnique },
            data: {
                groupName: data.title || "",
                groupItems: {
                    createMany: toCreate.data.length ? toCreate : undefined,
                    updateMany: toUpdate.length ? toUpdate : undefined,
                }
            },
        });
        if (create) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        Console(error.message);
        return false;
    }
}
