import { prisma } from "@/db-config";
import { WithdrawType, WithdrawReturn, WithdrawReturns, WithdrawSelect } from '@/models/withdraw/type';
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack';

export async function FindMany(options?: { status: "Pending" | "Approved" | "Rejected", fields?: string }): Promise<WithdrawType[]> {
    try {
        const withdrawns = await prisma.withdraw.findMany({
            where: {
                status: options?.status || undefined,
            },
            orderBy: {
                createdAt: "desc"
            },
            select: WithdrawSelect(options?.fields)
        });
        return WithdrawReturns(withdrawns, options?.fields);
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}
export async function FindUnique(identifier: string, fields?: string): Promise<WithdrawType | null> {
    try {
        const withdraw: WithdrawType | null = await prisma.withdraw.findUnique({ where: { unique: Sanitizer.toText(identifier) }, select: WithdrawSelect(fields) });
        if (withdraw) {
            return WithdrawReturn(withdraw, fields);
        } else {
            return null;
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}