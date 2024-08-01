import { Random } from "primepack";
import { CouponModel } from "@/models";
import { Console } from "@/middleware/http";

export async function CouponGenerator(): Promise<string | null> {
    try {
        const random = await Random(10);
        if (await CouponModel.find.unique(random)) {
            return null;
        } else {
            return random
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}