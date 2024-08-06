import { prisma } from "@/db-config";
import { WithdrawModel } from '@/models'
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack'
import { WithdrawReturn, WithdrawSelect, WithdrawType } from "@/models/withdraw/type";

export async function Update(identifier: string, data: { status?: "Pending" | "Approved" | "Rejected" }, fields?: string): Promise<WithdrawType | null> {
    try {
        const find = await WithdrawModel.find.unique(identifier);
        if (find) {
            const update = await prisma.withdraw.update({
                where: { unique: find.unique },
                data: {
                    status: data.status ? Sanitizer.toString(data.status) as "Pending" | "Approved" | "Rejected" : undefined,
                },
                select: WithdrawSelect(fields),
            })
            if (update) {
                return WithdrawReturn(update, fields);
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