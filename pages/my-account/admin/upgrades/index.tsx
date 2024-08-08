import Seo from "@/components/seo";
import Layout from "@/components/account/admin";
import { useEffect, useState } from "react";
import Fetch from "@/fetch";
import { toast } from "react-toastify";
import Link from "next/link";

function StatusUpdate({ unique, status }: { unique: string; status: "Pending" | "Approved" | "Rejected" }) {
    const [loader, setLoader] = useState<boolean>(false);
    const [select, setSelect] = useState<"Pending" | "Approved" | "Rejected">(status);
    const onChange = async (value: "Pending" | "Approved" | "Rejected") => {
        setSelect(value);
        await update(unique, value);
    }
    const update = async (identifier: string, status: "Pending" | "Approved" | "Rejected") => {
        setLoader(true);
        const res = await Fetch("/api/account/admin/upgrades/update", { method: "POST", body: { unique: identifier, status: status } });
        if (res.status === 200) {
            toast.success(res.body.message || "Something went wrong.");
        } else {
            toast.error(res.body.message || "Something went wrong.");
        }
        setLoader(false);
    }
    return (
        <>
            <select disabled={loader} value={select} onChange={(e) => { onChange(e.target.value as any) }} className="inp-text" title="Select Options">
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
            </select>
        </>
    )
}

export default function Upgrades() {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [select, setSelect] = useState<string>("Pending");
    const loadData = async (status?: string) => {
        setLoader(true);
        const res = await Fetch("/api/account/admin/upgrades", { method: "POST", body: { status } });
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
    return (
        <>
            <Seo title="Upgrades" />
            <Layout>
                <div className="box">
                    <div className="mb-3 grid grid-cols-2 gap-3 items-center">
                        <div>
                            <h1 className="text-xl md:text-3xl font-bold break-words">Upgrades</h1>
                        </div>
                        <div>
                            <select disabled={loader} value={select} onChange={(e) => { setSelect(e.target.value) }} className="inp-text" title="Select Options">
                                <option selected value="">All</option>
                                <option value="Pending">Pending</option>
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
                                    <th className="min-w-40">Status</th>
                                    <th className="min-w-40">Upgrade</th>
                                    <th className="min-w-28">Amount</th>
                                    <th className="min-w-32">Invoice</th>
                                    <th className="min-w-64">Product Title</th>
                                    <th className="min-w-40">Phone Number</th>
                                    <th className="min-w-52">Gateway</th>
                                    <th className="min-w-40">TrxID</th>
                                    <th className="min-w-20">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{`${new Date(item?.createdAt).toDateString()}`}</td>
                                        <td><StatusUpdate unique={item?.unique || ""} status={item?.status || "Pending"} /></td>
                                        <td>{item?.plan}{item.extend ? " (" + item.quantity + ")" : ""}</td>
                                        <td>{(item?.amount || 0) + "/" + ((item?.amount || 0) - (((item?.couponClient || 0) / 100) * (item?.amount || 0)))}</td>
                                        <td>{item?.invoice}</td>
                                        <td>{item?.product}</td>
                                        <td>{item?.phone}</td>
                                        <td>{item?.method}</td>
                                        <td>{item?.trxID}</td>
                                        <td className="flex gap-1.5">
                                            <Link className="link" href={"/my-account/admin/upgrades/" + item.unique}>Details</Link>
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