import { prisma } from "@/db-config";
import { OrderModel } from '@/models'
import { Console } from "@/middleware/http";
import { Sanitizer } from 'primepack'
import { OrderReturn, OrderSelect, OrderType } from "@/models/order/type";

export async function Update(identifier: string, data: { status?: "Pending" | "Processing" | "Shipping" | "Delivered" | "Rejected" | "Hold" | "Canceled" }, fields?: string): Promise<OrderType | null> {
    try {
        const find = await OrderModel.find.unique(identifier);
        if (find) {
            const update = await prisma.order.update({
                where: { unique: find.unique },
                data: {
                    status: data.status ? Sanitizer.toString(data.status) as "Pending" | "Processing" | "Shipping" | "Delivered" | "Rejected" | "Hold" | "Canceled" : undefined,
                },
                select: OrderSelect(fields),
            })            
            if (update) {
                return OrderReturn(update, fields);
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