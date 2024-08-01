import Layout from "@/components/account";
import Seo from "@/components/seo";
import CreateProfile from "@/components/account/profile/create";
import UpdateProfile from "@/components/account/profile/update";
import Fetch from "@/fetch";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function MultipleProfile({ profiles, profileLength, fulfill }: { profiles: any[], profileLength: number, fulfill: boolean }) {
    const [creator, setCreator] = useState<boolean>(false);
    const [updator, setUpdater] = useState<any | null>(null);
    return <div className="box p-0 mb-0">
        <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
            {creator && <h1 className="text-xl font-bold">{"Create Profile"}</h1>}
            {updator && <h1 className="text-xl font-bold">{`Update Profile (${updator?.name})`}</h1>}
            {!creator && !updator && <h1 className="text-xl font-bold">{`All Profiles (${profiles?.length}/${profileLength})`}</h1>}
            {!updator && fulfill && <Link className="px-4 py-2 bg-purple-600 text-white rounded-xl active:scale-90 duration-200" href="/my-account/upgrade">Extend</Link>}
            {!fulfill && !creator && !updator && <button className="px-4 py-2 bg-green-600 text-white rounded-xl active:scale-90 duration-200" onClick={() => setCreator(true)} type="button">Create</button>}
            {creator && <button className="px-4 py-2 bg-purple-600 text-white rounded-xl active:scale-90 duration-200" onClick={() => setCreator(false)} type="button">View All</button>}
            {updator && <button className="px-4 py-2 bg-purple-600 text-white rounded-xl active:scale-90 duration-200" onClick={() => setUpdater(false)} type="button">View All</button>}
        </div>
        <div className="p-3">
            {creator ? <CreateProfile /> : (<div>
                {profiles?.length <= 0 && <div className="box mb-0">
                    <h2 className="text-center py-10 px-4">No Profile Found.</h2>
                </div>}
                {profiles?.length >= 1 && updator && <UpdateProfile profile={updator} />}
                {profiles?.length >= 1 && !updator && <>
                    <div className="grid grid-cols-1 gap-3">
                        {profiles?.map((account, index) => {
                            return (<div className="bg-white/40 rounded-lg hover:bg-white/70 px-3 py-2 flex flex-wrap items-center justify-between gap-1 md:gap-3 duration-200" key={index}>
                                <div className="shrink-0 md:shrink w-full md:w-auto">
                                    <Link className="hover:text-purple-800 duration-200 active:scale-90 inline-block" href={`/p/${account.link}`}><h3 className="font-bold text-xl flex items-center justify-center"><span className="mr-2 w-11 h-11 bg-white/50 text-center rounded-full flex justify-center items-center text-md">{(index + 1)}</span>{account.name}</h3></Link>
                                </div>
                                <div className="shrink-0 md:shrink w-full md:w-auto flex gap-1 justify-end items-center">
                                    <Link className="rounded-full py-2 px-3 bg-purple-700 hover:bg-purple-800 duration-200 text-white md:text-xl active:scale-90 inline-block" href={`/p/${account.link}`}><i className="bi bi-eye"></i></Link>
                                    <button onClick={() => setUpdater(account)} className="rounded-full py-2 px-3 bg-blue-700 hover:bg-blue-800 duration-200 text-white md:text-xl active:scale-90 inline-block" type="button" title="Edit"><i className="bi bi-pencil-square"></i></button>
                                </div>
                            </div>)
                        })}
                    </div>
                </>}
            </div>)}
        </div>
    </div>
}

function SingleProfile({ profile }: { profile: any }) {
    if (profile) {
        return <div className="box p-0 mb-0">
            <div className="box flex justify-between items-center rounded-b-none m-0">
                <h1 className="text-xl font-bold">{!profile ? "Create Profile" : "Update Profile"}</h1>
                <Link className="px-4 py-2 bg-purple-600 text-white rounded-xl active:scale-90 duration-200" href={"/p/" + profile.link}>Preview</Link>
            </div>
            <div className="p-3">
                <UpdateProfile profile={profile} />
            </div>
        </div>
    } else {
        return <div className="box p-0 mb-0">
            <div className="box rounded-b-none m-0">
                <h1 className="text-xl font-bold">{!profile ? "Create Profile" : "Update Profile"}</h1>
            </div>
            <div className="p-3">
                <CreateProfile />
            </div>
        </div>
    }
}

export default function Profile() {
    const { data: session } = useSession();
    const [loader, setLoader] = useState<boolean>(true);
    const [profile, setProfile] = useState<any[]>([]);
    const [profileLength, setProfileLength] = useState<number>(1);
    const [fulfill, setFulfill] = useState<boolean>(false);
    useEffect(() => {
        Fetch("/api/account/profile/views", { method: "POST" }).then((res) => {
            if (res.status === 200) {
                setProfile(res.body.profiles);
                setFulfill(res.body.fulfill);
                setProfileLength(res.body.profileLength || 0);
                setLoader(false)
            } else {
                setProfile([])
                setLoader(false)
            }
        })
    }, [])
    return (
        <>
            <Seo title="Manage Profile" />
            <Layout>
                {loader && <span className='bg-white/50 rounded-xl w-full h-96 inline-block animate-pulse'></span>}
                {!loader && session?.user?.name === "BUSINESS" && <MultipleProfile profiles={profile} profileLength={profileLength} fulfill={fulfill} />}
                {!loader && session?.user?.name !== "BUSINESS" && <SingleProfile profile={profile[0]} />}
            </Layout>
        </>
    );
}