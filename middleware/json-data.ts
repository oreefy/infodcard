import { NextApiRequest } from 'next';

export default function JsonData(req: NextApiRequest): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(body);
            } catch (err) {
                resolve(undefined);
            }
        });
        req.on('error', (err) => {
            reject(undefined);
        });
    });
}
