import { Random } from "primepack";
import { OrderModel } from "@/models";
import { Console } from "@/middleware/http";

export async function GenerateInvoice(): Promise<string | null> {
    try {
        const random = await Random(10);
        const find = await OrderModel.find.unique(random);
        if (find) {
            return null;
        } else {
            return random
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}