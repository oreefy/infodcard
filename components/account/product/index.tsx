import Create from "@/components/account/product/create";
import Update from "@/components/account/product/update";
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
    const [products, setProducts] = useState<any[]>([]);
    const [profiles, setProfiles] = useState<any[]>([]);
    const [deleted, setDeleted] = useState<string>("");
    const [select, setSelect] = useState<string>("");
    const loadFirst = () => {
        Fetch("/api/account/profile/views", { method: "POST" }).then((res) => {
            if (res.body.profiles.length) {
                setProfiles(res.body.profiles);
                setProducts(res.body.profiles[0].products);
                setNewAccount(false);
                setLink(res.body.profiles[0].link);
            } else {
                setProducts([]);
                setNewAccount(true);
            }
            setLoader(false);
        })
    }
    useEffect(() => { loadFirst(); }, [])
    useEffect(() => { loadFirst() }, [creator, updator])
    const deleteAction = (unique: string) => {
        setDeleted(unique);
        Fetch("/api/account/product/delete", { method: "POST", body: { link: link, unique: unique } }).then((res) => {
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
            setProducts(profiles[select as any]?.products);
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
                        <h2 className="text-center font-bold text-xl">Select Profile</h2>
                    </div>
                    <div className="p-3 md:p-4">
                        <select title='Select Profile' name='profile' className='w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600' onChange={switchProfile} value={select}>
                            {profiles.map((profile: any, index: any) => {
                                return <option key={index} value={index}>{profile.name}</option>
                            })}
                        </select>
                    </div>
                </div>}
                {!loader && !newAccount && <div className="box p-0 mb-0">
                    <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                        {creator && <h1 className="text-xl font-bold">{"Create Product"}</h1>}
                        {updator && <h1 className="text-xl font-bold">{"Update Products"}</h1>}
                        {!creator && !updator && <h1 className="text-xl font-bold">{`All Products (${products.length}/${db.limits.product[session?.user?.name as "PREMIUM" | "BUSINESS"]})`}</h1>}
                        {!creator && !updator && <button className="px-4 py-2 bg-green-600 text-white rounded-xl active:scale-90 duration-200" type="button" onClick={() => setCreator(true)}>Create</button>}
                        {creator && <button className="px-4 py-2 bg-purple-600 text-white rounded-xl active:scale-90 duration-200" type="button" onClick={() => setCreator(false)}>View All</button>}
                        {updator && <button className="px-4 py-2 bg-purple-600 text-white rounded-xl active:scale-90 duration-200" type="button" onClick={() => setUpdater(false)}>View All</button>}
                    </div>
                    <div className="p-3">
                        {!loader && !newAccount && creator ? <Create link={link} /> : (<div>
                            {!loader && !newAccount && products && products.length <= 0 && <div className="box mb-0">
                                <h2 className="text-center py-10 px-4">No Product Found.</h2>
                            </div>}
                            {!loader && !newAccount && products && products.length >= 1 && updator && <Update link={link} product={updator} />}
                            {!loader && !newAccount && products && products.length >= 1 && !updator && <>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
                                    {
                                        products.map((product, index) => {
                                            return <div key={index} className="bg-white/30 hover:bg-white/50 duration-200 rounded-xl">
                                                <Image className="w-full h-44 bg-white/50 object-cover object-center rounded-t-lg" src={product.image} width={100} height={100} alt={product.title} />
                                                <div className="p-2">
                                                    {product.price && <div>
                                                        <strong className="text-xl pb-2">{product.price}</strong>
                                                    </div>}
                                                    <h3 className="font-bold leading-4 text-medium break-words mb-1">{product.title}</h3>
                                                    {product.message && <p className="text-xs break-words mb-2">{product.message}</p>}
                                                    <div className="text-end">
                                                        <button onClick={() => setUpdater(product)} className="py-2 px-4 bg-blue-700 hover:bg-blue-800 active:scale-90 duration-200 text-white rounded-xl text-xs mr-1.5" type="button">Edit</button>
                                                        {deleted !== product.unique ? <button disabled={deleted ? true : false} onClick={() => deleteAction(product.unique)} className="py-2 px-4 bg-red-700 hover:bg-red-800 active:scale-90 duration-200 text-white rounded-xl text-xs" type="button">Delete</button> : ""}
                                                        {deleted && deleted === product.unique ? <span className="w-10 px-5 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : ""}
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </>}
                        </div>)}
                    </div>
                </div>}
            </div>
        </>
    );
}