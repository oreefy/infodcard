import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { ProfileModel } from '@/models';

export async function Delete(email: string, link: string): Promise<boolean> {
    try {
        const profile = await ProfileModel.find.authorProfile(email, link, "profile.groupItems profile.socials profile.products profile.services profile.albums profile.localBanks profile.mobileBanks profile.globalBanks");
        if (profile) {
            const deleted: any = {
                groupItems: [],
                socials: [],
                products: [],
                services: [],
                albums: [],
                localBanks: [],
                mobileBanks: [],
                globalBanks: [],
            }
            profile.groupItems?.map((data) => { deleted.groupItems.push({ unique: data.unique }) });
            profile.socials?.map((data) => { deleted.socials.push({ unique: data.unique }) });
            profile.products?.map((data) => { deleted.products.push({ unique: data.unique }) });
            profile.services?.map((data) => { deleted.services.push({ unique: data.unique }) });
            profile.albums?.map((data) => { deleted.albums.push({ unique: data.unique }) });
            profile.localBanks?.map((data) => { deleted.localBanks.push({ unique: data.unique }) });
            profile.mobileBanks?.map((data) => { deleted.mobileBanks.push({ unique: data.unique }) });
            profile.globalBanks?.map((data) => { deleted.globalBanks.push({ unique: data.unique }) });

            const deletedData = await prisma.profile.update({
                where: { unique: profile.unique },
                data: {
                    groupItems: { delete: deleted.groupItems },
                    socials: { delete: deleted.socials },
                    products: { delete: deleted.products },
                    services: { delete: deleted.services },
                    albums: { delete: deleted.albums },
                    localBanks: { delete: deleted.localBanks },
                    mobileBanks: { delete: deleted.mobileBanks },
                    globalBanks: { delete: deleted.globalBanks },
                    delete: true
                },
            })
            if (deletedData) {
                return true;
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