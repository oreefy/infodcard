import type { NextApiRequest, NextApiResponse } from 'next';
import { Response, method, serverError } from "@/middleware/http";
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"


export async function Auth(req: NextApiRequest, res: NextApiResponse): Promise<{ name: string; email: string; image: string } | null> {
    try {
        if (await method(req, res)) {
            const user = await getServerSession(req, res, authOptions)
            if (user) {
                return user.user! as any;
            } else {
                Response(res, { message: "The client has not logged in." }, 401);
                return null;
            }
        } else {
            return null;
        }
    } catch (error: any) {
        serverError(res, "The client has not logged in.");
        return null;

    }
}
export async function Guest(req: NextApiRequest, res: NextApiResponse): Promise<{ name: string; email: string; image: string } | null> {
    try {
        if (await method(req, res)) {
            const user = await getServerSession(req, res, authOptions)
            if (user) {
                return user.user! as any;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error: any) {
        serverError(res, "The client has not logged in.");
        return null;

    }
}