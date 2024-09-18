import { NextApiRequest } from 'next';

export default async function FormData(req: NextApiRequest): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const contentType = req.headers['content-type'];
            if (!contentType || !contentType.startsWith('multipart/form-data')) {
                return reject({});
            }
            const boundary = contentType.split('; ')[1]?.replace('boundary=', '');
            if (!boundary) {
                return reject({});
            }
            const parts = body.split(`--${boundary}`);
            const formData: { [key: string]: string } = {};
            parts.forEach((part) => {
                if (part.includes('Content-Disposition')) {
                    const nameMatch = part.match(/name="(.+?)"/);
                    const value = part.split('\r\n\r\n')[1]?.split('\r\n')[0];
                    if (nameMatch && value) {
                        formData[nameMatch[1]] = value;
                    }
                }
            });
            resolve(formData);
        });
        req.on('error', (err) => {
            reject({});
        });
    });
}
