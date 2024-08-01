import { Console } from '@/middleware/http';
import { TransactionType } from '@/models/transaction/type';

export function StatusFilter(transactions: TransactionType[], status?: "Pending" | "Rejected" | "Approved"): TransactionType[] {
    try {
        let filtered: TransactionType[] = [];
        if (status) {
            transactions.map((transaction) => {
                if (transaction.status === status) {
                    filtered.push(transaction);
                }
            });
        } else {
            filtered = transactions;
        }
        return filtered;
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}