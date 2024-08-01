import { PropsWithChildren } from "react";

export default function Auth({ children }: PropsWithChildren) {
    return (
        <>
            <main className="container mx-auto max-w-md flex w-screen h-screen justify-center items-center p-3">{children}</main>
        </>
    );
}