import { Response } from '@/middleware/http';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'node:fs';
import path from 'node:path';

export default async function Assets(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { assets } = req.query;
        if (assets?.length) {
            const pathquery: any = assets;
            const filepath = path.join(process.cwd(), "uploads", pathquery.join("/"));
            if (fs.existsSync(filepath)) {
                const fileStream = fs.createReadStream(filepath);
                fileStream.pipe(res);
            } else {
                return await Response(res, { message: "The file doesn't exist." }, 404);
            }
        } else {
            return await Response(res, { message: "The file doesn't exist." }, 404);
        }

    } catch (error: any) {
        return await Response(res, { message: error?.message }, 404);
    }
}