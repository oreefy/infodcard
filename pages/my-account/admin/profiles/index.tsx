import Seo from "@/components/seo";
import Layout from "@/components/account/admin";
import { useEffect, useState } from "react";
import Fetch from "@/fetch";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

export default function Profiles() {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [select, setSelect] = useState<string>("");
    const loadData = async () => {
        setLoader(true);
        const res = await Fetch("/api/account/admin/profiles", { method: "POST" });
        if (res.status === 200) {
            setData(res.body.data);
            setLoader(false);
        } else {
            toast.error(res.body.message || "Something went wrong.");
        }
    }
    useEffect(() => { loadData() }, []);
    useEffect(() => { loadData() }, [select]);
    return (
        <>
            <Seo title="Profiles" />
            <Layout>
                <div className="box">
                    <div className="mb-3 grid grid-cols-2 gap-3 items-center">
                        <div>
                            <h1 className="text-xl md:text-3xl font-bold break-words">Profiles</h1>
                        </div>
                        <div>
                            <select disabled={loader} value={select} onChange={(e) => { setSelect(e.target.value) }} className="inp-text" title="Select Options">
                                <option selected value="">All</option>
                            </select>
                        </div>
                    </div>
                    {loader && <div className="w-full h-96 bg-white/50 rounded-2xl animate-pulse"></div>}
                    {!loader && <div className="table-box scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th className="min-w-40">Joined</th>
                                    <th>Avatar</th>
                                    <th className="min-w-32">URI</th>
                                    <th className="min-w-20">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{`${new Date(item?.createdAt).toDateString()}`}</td>
                                        <td><Image src={item?.avatar} width={40} height={40} alt={item.email} /></td>
                                        <td>{item?.link}</td>
                                        <td className="flex gap-1.5 items-center">
                                            <Link className="link" href={"/p/" + item.link}>View</Link>
                                            <Link className="link" href={"/my-account/admin/users/" + item.authorUnique}>Details</Link>
                                        </td>
                                    </tr>
                                })}
                                {!data.length ? <tr><td className="!text-center bg-white/0" colSpan={4}>Not Found</td></tr> : ""}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </Layout>
        </>
    );
}