import { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/middleware/http';
import { UserModel } from '@/models';
import { PrismaClient } from '@prisma/client';

export default async function SERVER_API_CHECK(req: NextApiRequest, res: NextApiResponse) {
    try {
        const permission = process.env.API_SERVER_CHECK;
        if (permission) {
            Response(res, {
                database: {
                    version: (PrismaClient?.prototype || null),
                    user: await UserModel.find.unique("infodcardbd@gmail.com"),
                },
                env: {
                    app: {
                        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
                        APP_URL: process.env.APP_URL,
                        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
                        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
                        API_URL: process.env.API_URL,
                        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
                    },
                    security: {
                        API_SERVER_CHECK: process.env.API_SERVER_CHECK,
                        ENCRYPT_SECRET: process.env.ENCRYPT_SECRET,
                    },
                    database: {
                        DATABASE_SHADOW_HOST: process.env.DATABASE_SHADOW_HOST,
                        DATABASE_SHADOW_PORT: process.env.DATABASE_SHADOW_PORT,
                        DATABASE_HOST: process.env.DATABASE_HOST,
                        DATABASE_PORT: process.env.DATABASE_PORT,
                        DATABASE_NAME: process.env.DATABASE_NAME,
                        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
                        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
                        DATABASE_URL: process.env.DATABASE_URL,
                        SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
                    },
                }
            }, 200);
        } else {
            Response(res, { message: "The url does not exist." }, 404)
        }
    } catch (error: any) {
        Response(res, { message: "The url does not exist." }, 404)
    }
}