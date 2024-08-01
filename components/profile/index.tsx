import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Profile({ children }: PropsWithChildren) {
    return (
        <>
            <div className="box py-1 flex justify-between items-center px-4 rounded-none">
                <Link className="font-extrabold" href="/">InfodCard</Link>
                <Link className="font-bold bg-black text-white px-4 py-1 rounded-full" href="/register">SignUp</Link>
            </div>
            <main className="container mx-auto max-w-md px-3 pt-0 relative">{children}</main>
        </>
    );
}