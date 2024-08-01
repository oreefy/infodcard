import { PropsWithChildren } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({ children }: PropsWithChildren) {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login");
        }
    })
    if (status === "authenticated") {
        if (session?.user?.email !== "infodcardbd@gmail.com") {
            router.push("/404");
            return null;
        }
    }
    if (status === "authenticated") {
        return (
            <>
                <div className="container mx-auto min-h-screen duration-200">
                    <div className="sticky-top bg-white/70 px-4 py-2 rounded-b-xl backdrop-blur-md left-0 right-0 top-0 flex justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/my-account/admin" title="Dashboard - InfodCard"><Image className='w-10 h-10 object-cover object-center hover:scale-125 active:scale-90 duration-200 mr-2' src="/favicon.ico" width={75} height={75} alt='InfodCard Logo'></Image></Link>
                            <Link className="px-2 py-1 text-xl bg-white/50 hover:bg-white hover:scale-110 active:scale-90 duration-200 rounded-full" title="My Account" href="/my-account"><i className="bi bi-speedometer2"></i></Link>
                        </div>
                        <div className="flex items-center">
                            <Link className="px-2 py-1 text-xl bg-white/50 hover:bg-white hover:scale-110 active:scale-90 duration-200 rounded-full mr-1.5" href="/my-account/admin/admin-messages" title="Inbox"><i className="bi bi-chat"></i></Link>
                            <Link className="px-2 py-1 text-xl bg-white/50 hover:bg-white hover:scale-110 active:scale-90 duration-200 rounded-full mr-1.5" href="/my-account/admin/upgrades" title="Upgrades"><i className="bi bi-coin"></i></Link>
                            <Link className="px-2 py-1 text-xl bg-white/50 hover:bg-white hover:scale-110 active:scale-90 duration-200 rounded-full mr-1.5" href="/my-account/admin/orders" title="Orders"><i className="bi bi-box"></i></Link>
                            <Link className="px-2 py-1 text-xl bg-white/50 hover:bg-white hover:scale-110 active:scale-90 duration-200 rounded-full mr-1.5 hidden md:block" href="/my-account/admin/users" title="Users"><i className="bi bi-people"></i></Link>
                            <button type="button" className="px-2 py-1 text-xl bg-red-800/70 hover:bg-red-500 text-white hover:scale-110 active:scale-90 duration-200 rounded-full" title="Sign Out" onClick={() => signOut({ redirect: false })}><i className="bi bi-power"></i></button>
                        </div>
                    </div>
                    <main className="px-2 lg:px-0 mt-2 md:mt-3 lg:mt-4 xl:mt-5">
                        {children}
                    </main>
                </div>
            </>
        );
    }
}