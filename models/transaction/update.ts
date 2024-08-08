import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { Sanitizer } from "primepack";
import { TransactionType, TransactionReturn, TransactionSelect } from "@/models/transaction/type";
import { TransactionModel } from "@/models";

interface TransactionUpdateType {
    status?: "Pending" | "Approved" | "Rejected";
}

export async function Update(identifier: string, data: TransactionUpdateType, fields?: string): Promise<TransactionType | null> {
    try {
        const find = await TransactionModel.find.unique(identifier, fields)
        if (find) {
            const update = await prisma.transaction.update({
                where: { unique: find.unique },
                data: {
                    status: data.status ? Sanitizer.toString(data.status) as "Pending" | "Approved" | "Rejected" : undefined,
                },
                select: TransactionSelect(fields),
            })
            if (update) {
                return TransactionReturn(update, fields);
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