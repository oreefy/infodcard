import { prisma } from "@/db-config";
import { Sanitizer } from 'primepack';
import { OrderReturn, OrderReturns, OrderSelect, OrderType } from "@/models/order/type";
import { Console } from "@/middleware/http";
import { UserModel } from "@/models";

export async function FindUnique(identifier: string, fields?: string): Promise<OrderType | null> {
    try {
        let find = await prisma.order.findUnique({
            where: { unique: Sanitizer.toString(identifier) },
            select: OrderSelect(fields),
        })
        if (find) {
            return OrderReturn(find, fields);
        } else {
            find = await prisma.order.findUnique({
                where: { invoice: Sanitizer.toString(identifier) },
                select: OrderSelect(fields),
            })
            if (find) {
                return OrderReturn(find, fields);
            } else {
                return null;
            }
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}
export async function FindUserOrders(identifier: string, fields?: string): Promise<OrderType[]> {
    try {
        const find = await UserModel.find.unique(identifier, fields);
        if (find) {
            return OrderReturns(find.orders!, fields)
        } else {
            return [];
        }
    } catch (error: any) {
        Console(error.message);
        return [];
    }
}