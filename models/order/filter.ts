import { Console } from '@/middleware/http';
import { OrderType } from '@/models/order/type';

export function StatusFilter(orders: OrderType[], status?: "Pending" | "Rejected" | "Processing" | "Shipping" | "Delivered" | "Hold" | "Canceled"): OrderType[] {
    try {
        let filtered: OrderType[] = [];
        if (status) {
            orders.map((order) => {
                if (order.status === status) {
                    filtered.push(order);
                }
            });
        } else {
            filtered = orders;
        }
        return filtered;
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}