import { IncomingForm, Files } from 'formidable';
import type { NextApiRequest } from 'next';
import path from 'node:path';
import { Random } from 'primepack';

function Parser(request: NextApiRequest): Promise<{ fields: any; files: Files }> {
    const form = new IncomingForm({
        keepExtensions: true,
        uploadDir: path.join(process.cwd(), "/public/temp"),
        filename: (name, ext, part, form) => {
            return `${new Date().getTime()}${Math.random() * Math.random()}`;
        },
    });
    return new Promise((resolve, reject) => {
        form.parse(request as any, (err, fields, files: Files) => {
            if (err) {
                reject({ fields: {}, files: [] });
            } else {
                resolve({ fields, files });
            }
        });
    });
};

function Validation(field: string, files: any, rules?: { extensions?: string[]; maxFiles?: number; maxFileSize?: number; maxTotalFileSize?: number; }): {
    field: string;
    validation: boolean;
    message: string;
    totalFiles: number;
    totalFileSize: number;
    uploads: any[];
    files: {
        extension: string;
        filename: string;
        newFilename: string;
        mimetype: string;
        size: number;
    }[];
} {
    let validation: boolean = true;
    let messages: string[] = [];
    let validatedFiles: { extension: string; filename: string; size: number; }[] = [];
    let extensions: string[] = [];
    let size: number = 0;
    let uploads: any[] = [];

    if (files.length) {
        files.map((file: any) => {
            uploads.push(file);
            const validated = {
                extension: path.extname(file.originalFilename),
                filename: file.originalFilename,
                newFilename: file.newFilename,
                mimetype: file.mimetype,
                size: file.size,
            };
            size += validated.size;
            if (rules?.maxFileSize) {
                if (validated.size > rules.maxFileSize) {
                    validation = false;
                }
            }
            if (rules?.extensions?.length) {
                if (!rules.extensions.includes(validated.extension)) {
                    validation = false;
                    !extensions.includes(validated.extension) && extensions.push(validated.extension);
                }
            }
            validatedFiles.push(validated);
        });
    } else {
        validation = false;
        messages = ["No files are available, but at least one file is required to proceed."]
    }
    if (rules?.maxFiles) {
        if (validatedFiles.length > rules.maxFiles) {
            validation = false;
            messages.push(`Too many files (${validatedFiles.length}). Max allowed: ${rules.maxFiles}.`);
        }
    }
    if (rules?.maxTotalFileSize) {
        if (size > rules.maxTotalFileSize) {
            validation = false;
            messages.push(`File size (${size}) exceeds the limit of: ${rules.maxTotalFileSize}.`);
        }
    }
    extensions.length && messages.push(`Invalid file extensions: ${extensions.join(", ")}. Allowed extensions: ${rules?.extensions}.`);
    return { uploads, field, validation, message: messages.join(", "), totalFiles: validatedFiles.length, totalFileSize: size, files };
}

export default async function Validate(
    request: NextApiRequest,
    fields: {
        field: string;
        extensions?: string[];
        maxFiles?: number;
        maxFileSize?: number;
        maxTotalFileSize?: number;
    }[],
): Promise<{
    validation: boolean;
    fields: Record<string, string>;
    files: {
        field: string;
        validation: boolean;
        message: string;
        totalFiles: number;
        totalFileSize: number;
        uploads: any[];
        files: {
            extension: string;
            newFilename: string;
            mimetype: string;
            filename: string;
            size: number;
        }[];
    }[];
}> {
    try {
        const parsed = await Parser(request);
        let verified: boolean = true;
        const files: any = [];
        fields.map((field) => {
            const validated = Validation(field.field, parsed.files[field.field], { extensions: field.extensions, maxFiles: field.maxFiles, maxFileSize: field.maxFileSize, maxTotalFileSize: field.maxTotalFileSize });
            if (!validated.validation) { verified = false }
            files.push(validated);
        });
        return { validation: verified, fields: parsed.fields, files: files };
    } catch (error: any) {
        return { validation: false, fields: {}, files: [] };
    }
}