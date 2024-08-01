import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { WithdrawType, WithdrawSelect, WithdrawReturn } from "@/models/withdraw/type";
import { Sanitizer } from "primepack";
import { UserModel } from "@/models";

export async function Create(authorIdentifier: string, data: { method: string; number: string; tk: number; message?: string }, fields?: string): Promise<WithdrawType | null> {
    try {
        const find = await UserModel.find.unique(authorIdentifier);
        if (find) {
            const create = await prisma.withdraw.create({
                data: {
                    authorUnique: Sanitizer.toText(find.unique),
                    method: Sanitizer.toString(data.method),
                    amount: +(Sanitizer.toNumber(data.tk) as number),
                    account: Sanitizer.toString(data.number),
                    message: Sanitizer.toString(data.message || "")
                },
                select: WithdrawSelect(fields)
            })
            if (create) {
                return WithdrawReturn(create, fields);
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}