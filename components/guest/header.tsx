import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import db from "@/database";

export default function Header() {
    const router = useRouter();
    const [sidebar, setSidebar] = useState(false);
    const { data: session } = useSession();
    return (
        <>
            {
                sidebar && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/60 lg:hidden z-50" onClick={() => setSidebar(false)}>
                    <aside className="h-full w-40 max-w-full bg-white shadow-md p-3">
                        {!session && <Link className="bg-slate-300 px-3 py-2 rounded-md font-semibold hover:bg-slate-400 duration-200 active:scale-95 inline-block w-full mb-2" href="/login"><i className="bi bi-person-fill-lock mr-2"></i><span>{db.header.signIn}</span></Link>}
                        {!session && <Link className="bg-slate-300 px-3 py-2 rounded-md font-semibold hover:bg-slate-400 duration-200 active:scale-95 inline-block w-full mb-2" href="/register"><i className="bi bi-person-plus-fill mr-2"></i><span>{db.header.signUp}</span></Link>}
                        <Link className={`${router.pathname.startsWith("/shop") ? "bg-slate-400" : "bg-slate-300 hover:bg-slate-400"} px-3 py-2 rounded-md font-semibold duration-200 active:scale-95 inline-block w-full mb-2`} href="/shop"><i className="bi bi-postcard-fill mr-2"></i><span>{db.header.products}</span></Link>
                        <Link className={`${router.pathname.startsWith("/videos") ? "bg-slate-400" : "bg-slate-300 hover:bg-slate-400"} px-3 py-2 rounded-md font-semibold duration-200 active:scale-95 inline-block w-full mb-2`} href="/videos"><i className="bi bi-play-btn mr-2"></i><span>{db.header.videos}</span></Link>
                        <Link className={`${router.pathname.startsWith("/designs") ? "bg-slate-400" : "bg-slate-300 hover:bg-slate-400"} px-3 py-2 rounded-md font-semibold duration-200 active:scale-95 inline-block w-full mb-2`} href="/designs"><i className="bi bi-images mr-2"></i><span>{db.header.cardDesign}</span></Link>
                        <Link className={`${router.pathname.startsWith("/reviews") ? "bg-slate-400" : "bg-slate-300 hover:bg-slate-400"} px-3 py-2 rounded-md font-semibold duration-200 active:scale-95 inline-block w-full mb-2`} href="/reviews"><i className="bi bi-star-fill mr-2"></i><span>{db.header.review}</span></Link>
                        <Link className={`${router.pathname.startsWith("/pricing") ? "bg-slate-400" : "bg-slate-300 hover:bg-slate-400"} px-3 py-2 rounded-md font-semibold duration-200 active:scale-95 inline-block w-full mb-2`} href="/pricing"><i className="bi bi-cash-coin mr-2"></i><span>{db.header.pricing}</span></Link>
                        <Link className={`${router.pathname.startsWith("/contact") ? "bg-slate-400" : "bg-slate-300 hover:bg-slate-400"} px-3 py-2 rounded-md font-semibold duration-200 active:scale-95 inline-block w-full mb-2`} href="/contact"><i className="bi bi-envelope mr-2"></i><span>{db.header.contact}</span></Link>
                        <Link className={`${router.pathname.startsWith("/about") ? "bg-slate-400" : "bg-slate-300 hover:bg-slate-400"} px-3 py-2 rounded-md font-semibold duration-200 active:scale-95 inline-block w-full mb-2`} href="/about"><i className="bi bi-building mr-2"></i><span>{db.header.about}</span></Link>
                        {session && session.user?.email === "infodcardbd@gmail.com" && <Link className="bg-slate-300 px-3 py-2 rounded-md font-semibold hover:bg-slate-400 duration-200 active:scale-95 inline-block w-full mb-2" href="/my-account/admin"><i className="bi bi-person-circle mr-2"></i><span>{db.header.myaccount}</span></Link>}
                        {session && session.user?.email !== "infodcardbd@gmail.com" && <Link className="bg-slate-300 px-3 py-2 rounded-md font-semibold hover:bg-slate-400 duration-200 active:scale-95 inline-block w-full mb-2" href="/my-account"><i className="bi bi-person-circle mr-2"></i><span>{db.header.myaccount}</span></Link>}
                    </aside>
                </div>
            }
            <div className="fixed top-0 left-0 right-0 bg-white/50 w-full backdrop-blur-md px-3 py-2 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="lg:hidden"><button className="bg-white/50 px-3 py-2 rounded-md font-semibold hover:bg-white/70 duration-200 hover:scale-110 active:scale-90 text-xs" onClick={() => setSidebar(true)}><i className="bi bi-shop mr-1.5"></i><span>Menu</span></button></div>
                    <div className="lg:hidden"><Link href="/"><Image className="w-10 h-10 object-cover object-center rounded-full duration-200 hover:scale-110 active:scale-90" width={300} height={100} src="/favicon.ico" alt="InfodCard" /></Link></div>
                    {!session && <div className="lg:hidden"><Link className="bg-white/50 px-3 py-2 rounded-md font-semibold hover:bg-white/70 duration-200 hover:scale-110 active:scale-90 text-xs" href="/register"><i className="bi bi-person-plus-fill mr-1.5"></i><span>{db.header.signUp}</span></Link></div>}
                    {session && session.user?.email === "infodcardbd@gmail.com" && <div className="lg:hidden"><Link className="bg-white/50 px-3 py-2 rounded-md font-semibold hover:bg-white/70 duration-200 hover:scale-110 active:scale-90 text-xs" href="/my-account/admin"><i className="bi bi-person-circle mr-1.5"></i><span>{db.header.myaccount}</span></Link></div>}
                    {session && session.user?.email !== "infodcardbd@gmail.com" && <div className="lg:hidden"><Link className="bg-white/50 px-3 py-2 rounded-md font-semibold hover:bg-white/70 duration-200 hover:scale-110 active:scale-90 text-xs" href="/my-account"><i className="bi bi-person-circle mr-1.5"></i><span>{db.header.myaccount}</span></Link></div>}
                    <div className="lg:flex justify-between items-center hidden">
                        <Link href="/" title={db.header.title}><Image className="w-10 h-10 object-cover object-center rounded-full duration-200 hover:scale-110 active:scale-90" width={300} height={100} src="/favicon.ico" alt={db.header.title} /></Link>
                        <div className="ml-4">
                            <Link className={`px-3 py-2 rounded-md font-semibold ${router.pathname.startsWith("/shop") ? "bg-white/50 hover:bg-white/70" : "hover:bg-white/70"} duration-200 hover:scale-110 active:scale-90`} href="/shop"><i className="bi bi-postcard-fill mr-1.5"></i><span>{db.header.products}</span></Link>
                            <Link className={`px-3 py-2 rounded-md font-semibold ${router.pathname.startsWith("/videos") ? "bg-white/50 hover:bg-white/70" : "hover:bg-white/70"} duration-200 hover:scale-110 active:scale-90 ml-1`} href="/videos"><i className="bi bi-play-btn mr-1.5"></i><span>{db.header.videos}</span></Link>
                            <Link className={`px-3 py-2 rounded-md font-semibold ${router.pathname.startsWith("/designs") ? "bg-white/50 hover:bg-white/70" : "hover:bg-white/70"} duration-200 hover:scale-110 active:scale-90 ml-1`} href="/designs"><i className="bi bi-images mr-1.5"></i><span>{db.header.cardDesign}</span></Link>
                            <Link className={`px-3 py-2 rounded-md font-semibold ${router.pathname.startsWith("/reviews") ? "bg-white/50 hover:bg-white/70" : "hover:bg-white/70"} duration-200 hover:scale-110 active:scale-90 ml-1`} href="/reviews"><i className="bi bi-star-fill mr-1.5"></i><span>{db.header.review}</span></Link>
                            <Link className={`px-3 py-2 rounded-md font-semibold ${router.pathname.startsWith("/pricing") ? "bg-white/50 hover:bg-white/70" : "hover:bg-white/70"} duration-200 hover:scale-110 active:scale-90 ml-1`} href="/pricing"><i className="bi bi-cash-coin mr-1.5"></i><span>{db.header.pricing}</span></Link>
                            <Link className={`px-3 py-2 rounded-md font-semibold ${router.pathname.startsWith("/contact") ? "bg-white/50 hover:bg-white/70" : "hover:bg-white/70"} duration-200 hover:scale-110 active:scale-90 ml-1`} href="/contact"><i className="bi bi-envelope mr-1.5"></i><span>{db.header.contact}</span></Link>
                            <Link className={`px-3 py-2 rounded-md font-semibold ${router.pathname.startsWith("/about") ? "bg-white/50 hover:bg-white/70" : "hover:bg-white/70"} duration-200 hover:scale-110 active:scale-90 ml-1`} href="/about"><i className="bi bi-building mr-1.5"></i><span>{db.header.about}</span></Link>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center">
                        {session && session.user?.email === "infodcardbd@gmail.com" && <Link className="bg-white/50 px-3 py-2 rounded-md font-semibold hover:bg-white/70 duration-200 hover:scale-110 active:scale-90 mr-2" href="/my-account/admin"><i className="bi bi-person-circle mr-1.5"></i><span>{db.header.myaccount}</span></Link>}
                        {session && session.user?.email !== "infodcardbd@gmail.com" && <Link className="bg-white/50 px-3 py-2 rounded-md font-semibold hover:bg-white/70 duration-200 hover:scale-110 active:scale-90 mr-2" href="/my-account"><i className="bi bi-person-circle mr-1.5"></i><span>{db.header.myaccount}</span></Link>}
                        {!session && <Link className="bg-white/50 px-3 py-2 rounded-md font-semibold hover:bg-white/70 duration-200 hover:scale-110 active:scale-90 mr-2" href="/login"><i className="bi bi-person-fill-lock mr-1.5"></i><span>{db.header.signIn}</span></Link>}
                        {!session && <Link className="bg-white/50 px-3 py-2 rounded-md font-semibold hover:bg-white/70 duration-200 hover:scale-110 active:scale-90" href="/register"><i className="bi bi-person-plus-fill mr-1.5"></i><span className="hidden md:inline">{db.header.signUp}</span></Link>}
                    </div>
                </div>
            </div>
        </>
    );
}