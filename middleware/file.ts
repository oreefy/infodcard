import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const File = {
    mkdir: function (destination: string) {
        try {
            if (!fs.existsSync(destination)) {
                fs.mkdirSync(destination, { recursive: true });
            }
            return true;
        } catch (error) {
            return false;
        }
    },
    upload: async function (destination: string, files: any): Promise<{ status: boolean; uploads: { filepath: string; filename: string }[] }> {
        try {
            const response: { status: boolean; uploads: { filepath: string; filename: string }[] } = { status: true, uploads: [] };
            for (const file of files) {
                const tempPath = file.filepath;
                const targetPath = path.join(process.cwd(), destination, file.newFilename + path.extname(file.originalFilename));
                await sharp(tempPath).resize({ width: 600 }).toFile(targetPath)
                await fs.promises.unlink(tempPath);
                response.uploads.push({ filepath: destination + "/" + file.newFilename + path.extname(file.originalFilename), filename: file.newFilename + path.extname(file.originalFilename) });
            }
            return response;
        } catch (error) {
            return { status: false, uploads: [] };
        }
    },
    cleanup: async function (files: any[]): Promise<boolean> {
        try {
            for (const file of files) {
                const tempPath = file.filepath;
                if (tempPath && fs.existsSync(tempPath)) {
                    await fs.promises.unlink(tempPath);
                }
            }
            return true;
        } catch (error) {
            console.log('Error during file cleanup:', error);
            return false;
        }
    }
};
export default File;