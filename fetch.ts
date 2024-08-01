import { Fetch as Fetcher } from 'primepack/client';
import { signOut } from 'next-auth/react';

async function Fetch(path: string, options?: { method?: string; body?: any; formData?: FormData; headers?: object; cache?: "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload" | "default" }) {
    const response: { status: number; body: any } = { status: 500, body: { message: "Something went wrong.", }, }
    try {
        const fetched = await Fetcher(process.env.API_URL! + path, options);
        if (fetched.status === 401) {
            signOut({ redirect: false, callbackUrl: process.env.API_URL! + "/login" });
            return fetched;
        } else {
            return fetched;
        }
    } catch (err: any) {
        return response;
    }
}
export default Fetch;