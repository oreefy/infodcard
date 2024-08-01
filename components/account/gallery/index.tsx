import Create from "@/components/account/gallery/create";
import NoProfile from "@/components/account/no-profile";
import db from "@/database";
import Fetch from "@/fetch";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function GalleryComponent() {
    const { data: session } = useSession();
    const [loader, setLoader] = useState<boolean>(true);
    const [deleteLoader, setDeleteLoader] = useState<string>("");
    const [creator, setCreator] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");
    const [newAccount, setNewAccount] = useState<boolean>(true);
    const [gallery, setGallery] = useState<any[]>([]);
    const [profiles, setProfiles] = useState<any[]>([]);
    const [select, setSelect] = useState<string>("");

    const loadFirst = async () => {
        const res = await Fetch("/api/account/profile/views", { method: "POST" });
        if (res.status === 200) {
            if (res.body.profiles.length) {
                setProfiles(res.body.profiles);
                setGallery(res.body.profiles[0].albums);
                setLink(res.body.profiles[0].link);
                setNewAccount(false);
            } else {
                setNewAccount(true);
                setGallery([]);
            }
            setLoader(false);
        } else {
            setGallery([]);
            setLoader(false);
        }
    }
    useEffect(() => { loadFirst() }, [])
    useEffect(() => { loadFirst() }, [creator]);
    const switchProfile = (event: any) => { setSelect(event.target.value || "") }
    const deleteAlbum = (unique: string) => {
        setDeleteLoader(unique);
        setTimeout(() => {
            setDeleteLoader("");
            toast.success("The album has been successfully deleted.");
        }, 3000)
    }
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
                            {creator && <h1 className="text-xl font-bold">{"Add to Album"}</h1>}
                            {!creator && <h1 className="text-xl font-bold">{`Gallery (${gallery.length}/${db.limits.gallery[session?.user?.name as "PREMIUM" | "BUSINESS"]})`}</h1>}
                            {!creator && <button className="px-4 py-2 bg-green-600 text-white rounded-xl active:scale-90 duration-200" onClick={() => setCreator(true)} type="button">Add</button>}
                            {creator && <button className="px-4 py-2 bg-purple-600 text-white rounded-xl active:scale-90 duration-200" onClick={() => setCreator(false)} type="button">View All</button>}
                        </div>
                        <div className="p-3">
                            {!loader && !newAccount && creator ? <Create link={link} /> : (<div>
                                {!loader && !newAccount && gallery && gallery.length <= 0 && <div className="box mb-0">
                                    <h2 className="text-center py-10 px-4">No Album Found.</h2>
                                </div>}
                                {!loader && !newAccount && gallery && gallery.length >= 1 && <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
                                        {
                                            gallery.map((album, index) => {
                                                return <div key={index} className="rounded-xl bg-white/30 p-1">
                                                    <div className="relative w-full h-44 flex" >
                                                        <Link target="_blank" href={album.image}>
                                                            <Image className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover object-center rounded-xl" src={album.image} width={100} height={100} alt={""}></Image>
                                                        </Link>
                                                        <button disabled={deleteLoader ? true : false} onClick={() => deleteAlbum(album.unique)} className="bg-red-400/50 hover:bg-red-500 active:bg-red-600 ring-2 ring-white/50 absolute bottom-3 right-3 w-10 h-10 rounded-full text-white active:scale-90 flex items-center justify-center duration-300" type="button" title="Delete">
                                                            {deleteLoader === album.unique ? <span className="w-5 h-5 bg-white rounded-full inline-block animate-ping"></span> : <i className="bi bi-trash text-xl"></i>}
                                                        </button>
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