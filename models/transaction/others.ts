import { Random } from "primepack";
import { TransactionModel, UserModel } from "@/models";
import { Console } from "@/middleware/http";

export async function CouponGenerator(): Promise<string | null> {
    try {
        const random = await Random(10);
        if (await TransactionModel.find.unique(random)) {
            return null;
        } else {
            return random
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}

export async function CheckStatus(authorIdentifier: string, plan: "FREE" | "PREMIUM" | "BUSINESS"): Promise<boolean> {
    try {
        let status = false;
        const user = await UserModel.find.unique(authorIdentifier, "user.transactions");
        if (user) {
            user.transactions?.map((transaction) => {
                if (transaction.status === "Pending" && transaction.plan === plan) {
                    status = true;
                }
            });
        }
        return status;
    } catch (error: any) {
        Console(error.message);
        return false;
    }
}