import Create from "@/components/account/service/create";
import Update from "@/components/account/service/update";
import NoProfile from "@/components/account/no-profile";
import Fetch from "@/fetch";
import Image from "next/image";
import { useEffect, useState } from "react";
import db from "@/database";
import { useSession } from "next-auth/react";

export default function ServicePage() {
    const { data: session } = useSession();
    const [loader, setLoader] = useState<boolean>(true);
    const [creator, setCreator] = useState<boolean>(false);
    const [updator, setUpdater] = useState<{} | null>(null);
    const [link, setLink] = useState<string>("");
    const [newAccount, setNewAccount] = useState<boolean>(true);
    const [services, setServices] = useState<any[]>([]);
    const [profiles, setProfiles] = useState<any[]>([]);
    const [deleted, setDeleted] = useState<string>("");
    const [select, setSelect] = useState<string>("");
    const loadFirst = () => {
        Fetch("/api/account/profile/views", { method: "POST" }).then((res) => {
            if (res.body.profiles.length) {
                setProfiles(res.body.profiles);
                setServices(res.body.profiles[0].services);
                setNewAccount(false);
                setLink(res.body.profiles[0].link);
            } else {
                setServices([]);
                setNewAccount(true);
            }
            setLoader(false);
        })
    }
    useEffect(() => {
        loadFirst();
    }, [])
    useEffect(() => {
        loadFirst();
    }, [creator, updator])
    const deleteAction = (unique: string) => {
        setDeleted(unique);
        Fetch("/api/account/service/delete", { method: "POST", body: { link: link, unique: unique } }).then((res) => {
            if (res.status === 200) {
                setDeleted("");
                loadFirst();
            } else {
                setDeleted("");
            }
        })
    }
    useEffect(() => {
        if (select) {
            setServices(profiles[select as any]?.services);
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
                            {creator && <h1 className="text-xl font-bold">{"Create Service"}</h1>}
                            {updator && <h1 className="text-xl font-bold">{"Update Service"}</h1>}
                            {!creator && !updator && <h1 className="text-xl font-bold">{`All Services (${services.length}/${db.limits.service[session?.user?.name as "PREMIUM" | "BUSINESS"]})`}</h1>}
                            {!creator && !updator && <button className="px-4 py-2 bg-green-600 text-white rounded-xl active:scale-90 duration-200" onClick={() => setCreator(true)} type="button">Create</button>}
                            {creator && <button className="px-4 py-2 bg-purple-600 text-white rounded-xl active:scale-90 duration-200" onClick={() => setCreator(false)} type="button">View All</button>}
                            {updator && <button className="px-4 py-2 bg-purple-600 text-white rounded-xl active:scale-90 duration-200" onClick={() => setUpdater(false)} type="button">View All</button>}
                        </div>
                        <div className="p-3">
                            {!loader && !newAccount && creator ? <Create link={link} /> : (<div>
                                {!loader && !newAccount && services && services.length <= 0 && <div className="box mb-0">
                                    <h2 className="text-center py-10 px-4">No Service Found.</h2>
                                </div>}
                                {!loader && !newAccount && services && services.length >= 1 && updator && <Update link={link} service={updator} />}
                                {!loader && !newAccount && services && services.length >= 1 && !updator && <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
                                        {
                                            services.map((service, index) => {
                                                return <div key={index} className="bg-white/30 hover:bg-white/50 duration-200 rounded-xl">
                                                    <Image className="w-full h-44 bg-white/50 object-cover object-center rounded-t-lg" src={service.image} width={100} height={100} alt={service.title} />
                                                    <div className="p-2">
                                                        {service.price && <div>
                                                            <strong className="text-xl pb-2">{service.price}</strong>
                                                        </div>}
                                                        <h3 className="font-bold leading-4 text-medium break-words mb-1">{service.title}</h3>
                                                        {service.message && <p className="text-xs break-words mb-2">{service.message}</p>}
                                                        <div className="mt-2 text-end">
                                                            <button onClick={() => setUpdater(service)} className="py-2 px-4 bg-blue-700 hover:bg-blue-800 active:scale-90 duration-200 text-white rounded-xl text-xs mr-1.5" type="button">Edit</button>
                                                            {deleted !== service.unique ? <button disabled={deleted ? true : false} onClick={() => deleteAction(service.unique)} className="py-2 px-4 bg-red-700 hover:bg-red-800 active:scale-90 duration-200 text-white rounded-xl text-xs" type="button">Delete</button> : ""}
                                                            {deleted && deleted === service.unique ? <span className="w-10 px-5 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : ""}
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