import { prisma } from "@/db-config";
import { Console } from "@/middleware/http";

export default async function Messages(email: string): Promise<{ name: string; message: string, number: string }[] | null> {
    try {
        const user = await prisma.user.findUnique({ where: { email: email } });
        return await prisma.message.findMany({
            where: {
                authorUnique: user?.unique || "",
            },
            select: {
                unique: true,
                name: true,
                message: true,
                number: true,
            }
        })
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}