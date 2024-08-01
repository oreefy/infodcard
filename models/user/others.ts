import { UserModel } from '@/models';
import { Console } from "@/middleware/http";
import { Random } from 'primepack';

export async function CodeGenerate(): Promise<string | null> {
    try {
        const random = await Random(10);
        if (await UserModel.find.unique(random)) {
            return null;
        } else {
            return random
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}