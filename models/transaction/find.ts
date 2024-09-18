import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";
import { TransactionType, TransactionSelect, TransactionReturn, TransactionReturns } from "@/models/transaction/type";
import { Sanitizer } from "primepack";

export async function FindUnique(identifier: string, fields?: string): Promise<TransactionType | null> {
    try {
        let transaction: TransactionType | null = null;
        transaction = await prisma.transaction.findUnique({ where: { unique: Sanitizer.toText(identifier), }, select: TransactionSelect(fields) });
        if (transaction) {
            return TransactionReturn(transaction, fields);
        } else {
            transaction = await prisma.transaction.findUnique({ where: { invoice: Sanitizer.toText(identifier), }, select: TransactionSelect(fields) });
            if (transaction) {
                return TransactionReturn(transaction, fields);
            } else {
                return null;
            }
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function FindMany(options: { fields?: string, status: "Pending" | "Approved" | "Rejected" }): Promise<TransactionType[]> {
    try {
        const transactions = await prisma.transaction.findMany({
            where: { status: options?.status || undefined },
            orderBy: { createdAt: "desc" },
            select: TransactionSelect(options.fields),
        });
        return TransactionReturns(transactions, options.fields);
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}
export async function FindAll(fields?: string): Promise<TransactionType[]> {
    try {
        const transactions = await prisma.transaction.findMany({
            select: TransactionSelect(fields),
            take: 50,
            orderBy: { createdAt: "desc" }
        });
        return TransactionReturns(transactions, fields);
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}