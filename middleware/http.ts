import type { NextApiRequest, NextApiResponse } from "next";

export function Console(error?: string): void {
    console.log("Server Error: " + error ? error + "." : "Unnamed error.");
}

export async function Response(res: NextApiResponse, data: object, status: number = 200): Promise<void> {
    try {
        if (!res.headersSent) {
            res.status(status).json(data);
        } else {
            serverError(res);
        }
    } catch (error: any) {
        Console(error.message);
    }
}

export async function serverError(res: NextApiResponse, error?: string): Promise<void> {
    try {
        if (!res.headersSent) {
            res.status(500).json({
                message: "Internal Server Error.",
            });
            console.log(`Internal Server Error${error ? ": " + error + "." : "."}`);
        } else {
            res.end();
            console.log("Internal Server Error: Header already sent.");
        }
    } catch (error: any) {
        Console(error.message);
    }
}

export async function notFound(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        if (!res.headersSent) {
            res.status(404).json({
                message:
                    "The requested URL " + req.url + " was not found on this server.",
            });
        } else {
            serverError(res);
        }
    } catch (error: any) {
        Console(error.message);
    }
}

export async function method(req: NextApiRequest, res: NextApiResponse, accept: string = "POST"): Promise<boolean> {
    try {
        if (req.method === accept.toUpperCase()) {
            return true;
        } else {
            await notFound(req, res);
            return false;
        }
    } catch (error: any) {
        Console(error.message);
        await notFound(req, res);
        return false;
    }
}
