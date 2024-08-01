import Create from "@/components/account/mobile-bank/create";
import Update from "@/components/account/mobile-bank/update";
import Fetch from "@/fetch";
import Image from "next/image";
import { useEffect, useState } from "react";
import NoProfile from "@/components/account/no-profile";
import db from "@/database";
import { useSession } from "next-auth/react";

export default function ProductPage() {
    const { data: session } = useSession();
    const [loader, setLoader] = useState<boolean>(true)
    const [creator, setCreator] = useState<boolean>(false)
    const [updator, setUpdater] = useState<{} | null>(null)
    const [link, setLink] = useState<string>("");
    const [newAccount, setNewAccount] = useState<boolean>(true);
    const [mobileBank, setMobileBank] = useState<any[]>([]);
    const [profiles, setProfiles] = useState<any[]>([]);
    const [deleted, setDeleted] = useState<string>("");
    const [select, setSelect] = useState<string>("");
    const loadFirst = () => {
        Fetch("/api/account/profile/views", { method: "POST" }).then((res) => {
            if (res.body.profiles.length) {
                setProfiles(res.body.profiles);
                setMobileBank(res.body.profiles[0].mobileBanks);
                setNewAccount(false);
                setLink(res.body.profiles[0].link);
            } else {
                setMobileBank([]);
                setNewAccount(true);
            }
            setLoader(false);
        })
    }
    useEffect(() => { loadFirst(); }, [])
    useEffect(() => { loadFirst(); }, [creator, updator])
    const deleteAction = (unique: string) => {
        setDeleted(unique);
        Fetch("/api/account/mobile-bank/delete", { method: "POST", body: { link: link, unique: unique } }).then((res) => {
            setDeleted("");
            loadFirst();
        })
    }
    useEffect(() => {
        if (select) {
            setMobileBank(profiles[select as any]?.mobileBanks);
            setLink(profiles[+select]?.link);
            setNewAccount(false);
        }
    }, [select, profiles, link]);
    const switchProfile = (event: any) => { setSelect(event.target.value || "") }
    return (
        <>
            <div>
                {!loader && newAccount && <NoProfile />}
                {loader && <span className='bg-white/50 rounded-xl w-full h-96 inline-block animate-pulse'></span>}
                {!loader && profiles.length >= 2 && <div className="box p-0">
                    <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                        <h2 className="text-center font-bold text-xl ">Select Profile</h2>
                    </div>
                    <div className="p-3 md:p-4">
                        <select title='Select Profile' name='profile' value={select} className='w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600' onChange={switchProfile}>
                            {profiles.map((profile: any, index: any) => {
                                return <option key={index} value={index}>{profile.name}</option>
                            })}
                        </select>
                    </div>
                </div>}
                {
                    !loader && !newAccount && <div className="box p-0 mb-0">
                        <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                            {creator && <h1 className="text-xl font-bold">{"Create Mobile Bank"}</h1>}
                            {updator && <h1 className="text-xl font-bold">{"Update Mobile Bank"}</h1>}
                            {!creator && !updator && <h1 className="text-xl font-bold">{`All Mobile Banks (${mobileBank.length}/${db.limits.mobileBank[session?.user?.name as "PREMIUM" | "BUSINESS"]})`}</h1>}
                            {!creator && !updator && <button className="px-4 py-2 bg-green-600 text-white rounded-xl active:scale-90 duration-200" onClick={() => setCreator(true)} type="button">Create</button>}
                            {creator && <button className="px-4 py-2 bg-purple-600 text-white rounded-xl active:scale-90 duration-200" onClick={() => setCreator(false)} type="button">View All</button>}
                            {updator && <button className="px-4 py-2 bg-purple-600 text-white rounded-xl active:scale-90 duration-200" onClick={() => setUpdater(false)} type="button">View All</button>}
                        </div>
                        <div className="p-3">
                            {!loader && !newAccount && creator ? <Create link={link} /> : (<div>
                                {!loader && !newAccount && mobileBank && mobileBank.length <= 0 && <div className="box mb-0">
                                    <h2 className="text-center py-10 px-4">No Mobile Bank Found.</h2>
                                </div>}
                                {!loader && !newAccount && mobileBank && mobileBank.length >= 1 && updator && <Update link={link} product={updator} />}
                                {!loader && !newAccount && mobileBank && mobileBank.length >= 1 && !updator && <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
                                        {
                                            mobileBank.map((bank, index) => {
                                                return <div key={index} className="rounded-xl bg-white/30 p-3 text-center">
                                                    <Image className="w-20 h-20 object-cover object-center rounded-full inline-block mb-2" src={bank.logo} width={100} height={100} alt={bank.name}></Image>
                                                    <div>
                                                        <h3>
                                                            <span className="font-bold text-xl mr-1">{bank.name}</span>
                                                            <span className="font-semibold">{`(${bank.type})`}</span>
                                                        </h3>
                                                        <h4 className="font-bold text-xl mr-1">{bank.number}</h4>
                                                        <div className="mt-2 text-center">
                                                            <button onClick={() => setUpdater(bank)} className="py-2 px-4 bg-blue-700 hover:bg-blue-800 active:scale-90 duration-200 text-white rounded-xl text-xs mr-1.5" type="button">Edit</button>
                                                            {deleted !== bank.unique ? <button disabled={deleted ? true : false} onClick={() => deleteAction(bank.unique)} className="py-2 px-4 bg-red-700 hover:bg-red-800 active:scale-90 duration-200 text-white rounded-xl text-xs" type="button">Delete</button> : ""}
                                                            {deleted && deleted === bank.unique ? <span className="w-10 px-5 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </>}
                            </div>)}
                        </div>
                    </div>
                }
            </div>
        </>
    );
}