import Create from "@/components/account/profile/free/create";
import Update from "@/components/account/profile/free/update";
import Fetch from "@/fetch";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreateFreeProfile() {
    const [loader, setLoader] = useState<boolean>(true)
    const [profile, setProfile] = useState<any | null>(null);
    useEffect(() => {
        Fetch("/api/account/profile/free/views", { method: "POST" }).then((res) => {
            if (res.status === 200) {
                setProfile(res.body.profile);
            } else {
                setProfile(null)
            }
            setLoader(false)
        })
    }, [])
    return (
        <>
            <div className="box p-0 mb-0">
                {!loader && !profile && <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                    <h1 className="text-center font-bold text-xl ">Create Profile</h1>
                </div>}
                {!loader && profile && <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                    <h1 className="text-center font-bold text-xl ">Manage Profile</h1>
                    <Link className="px-4 py-2 bg-blue-600 tracking-wide rounded-lg hover:bg-blue-700 active:scale-90 duration-200 font-bold text-white" href={"/p/" + profile.link}>View</Link>
                </div>}
                {loader && <span className='bg-white/50 rounded-xl w-full h-96 inline-block animate-pulse'></span>}
                {!loader && !profile && <div className="p-3 md:p-4"><Create /></div>}
                {!loader && profile && <div className="p-3 md:p-4"><Update profile={profile} /></div>}
            </div>
        </>
    );
}