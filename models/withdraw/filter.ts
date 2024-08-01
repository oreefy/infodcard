import { Console } from '@/middleware/http';
import { WithdrawType } from '@/models/withdraw/type';

export function StatusFilter(withdrawns: WithdrawType[], status?: "Pending" | "Rejected" | "Approved"): WithdrawType[] {
    try {
        let filtered: WithdrawType[] = [];
        if (status) {
            withdrawns.map((withdraw) => {
                if (withdraw.status === status) {
                    filtered.push(withdraw);
                }
            });
        } else {
            filtered = withdrawns;
        }
        return filtered;
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}