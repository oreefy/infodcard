import Seo from "@/components/seo";
import Layout from "@/components/account/admin";
import { useEffect, useState } from "react";
import Fetch from "@/fetch";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Withdrawns() {
    const [loader, setLoader] = useState(true);
    const [updateLoader, setUpdateLoader] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [select, setSelect] = useState<string>("Pending");
    const loadData = async (status?: string) => {
        setLoader(true);
        const res = await Fetch("/api/account/admin/withdrawns", { method: "POST", body: { status } });
        if (res.status === 200) {
            setData(res.body.data);
            setLoader(false);
        } else {
            toast.error(res.body.message || "Something went wrong.");
        }
    }
    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        loadData(select);
    }, [select]);
    const update = async (identifier: string, status: "Pending" | "Approved" | "Rejected") => {
        setUpdateLoader(true);
        const res = await Fetch("/api/account/admin/withdrawns/update", { method: "POST", body: { unique: identifier, status: status } });
        if (res.status === 200) {
            toast.success(res.body.message || "Something went wrong.");
        } else {
            toast.error(res.body.message || "Something went wrong.");
        }
        await loadData(select);
        setUpdateLoader(false);
    }
    return (
        <>
            <Seo title="Withdrawns" />
            <Layout>
                <div className="box">
                    <div className="mb-3 grid grid-cols-2 gap-3 items-center">
                        <div>
                            <h1 className="text-xl md:text-3xl font-bold break-words">Withdrawns</h1>
                        </div>
                        <div>
                            <select disabled={loader} value={select} onChange={(e) => { setSelect(e.target.value) }} className="inp-text" title="Select Options">
                                <option value="">All</option>
                                <option selected value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                    {loader && <div className="w-full h-96 bg-white/50 rounded-2xl animate-pulse"></div>}
                    {!loader && <div className="table-box scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th className="min-w-40">Joined</th>
                                    <th className="min-w-40">Authorized</th>
                                    <th className="min-w-28">Status</th>
                                    <th className="min-w-28">Amount</th>
                                    <th className="min-w-44">Gateway</th>
                                    <th className="min-w-52">Message</th>
                                    <th className="min-w-52">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{`${new Date(item?.createdAt).toDateString()}`}</td>
                                        <td>{`${new Date(item?.updatedAt).toDateString()}`}</td>
                                        <td>{item?.status}</td>
                                        <td>{item?.amount}</td>
                                        <td>{item?.method}</td>
                                        <td>{item?.message}</td>
                                        <td className="flex gap-1.5">
                                            {updateLoader ? <>
                                                <p>Please Wait...</p>
                                            </> : <>
                                                <button type="button" onClick={() => update(item?.unique!, "Pending")} disabled={updateLoader} className={`rounded-full ${item?.status === "Pending" ? "bg-orange-200 hover:bg-orange-600 hover:text-white" : "link"} active:scale-75 duration-200 px-1.5 py-0.5`} title="Pending"><i className="bi bi-clock"></i></button>
                                                <button type="button" onClick={() => update(item?.unique!, "Approved")} disabled={updateLoader} className={`rounded-full ${item?.status === "Approved" ? "bg-green-200 hover:bg-green-600 hover:text-white" : "link"} active:scale-75 duration-200 px-1.5 py-0.5`} title="Approve"><i className="bi bi-check-lg"></i></button>
                                                <button type="button" onClick={() => update(item?.unique!, "Rejected")} disabled={updateLoader} className={`rounded-full ${item?.status === "Rejected" ? "bg-red-200 hover:bg-red-600 hover:text-white" : "link"} active:scale-75 duration-200 px-1.5 py-0.5`} title="Reject"><i className="bi bi-x-lg"></i></button>
                                            </>}
                                            <Link className="link" href={"/my-account/admin/users/" + item.authorUnique}>History</Link>
                                        </td>
                                    </tr>
                                })}
                                {!data.length ? <tr><td className="!text-center bg-white/0" colSpan={7}>Not Found</td></tr> : ""}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </Layout>
        </>
    );
}