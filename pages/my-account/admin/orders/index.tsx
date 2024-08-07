import Seo from "@/components/seo";
import Layout from "@/components/account/admin";
import { useEffect, useState } from "react";
import Fetch from "@/fetch";
import { toast } from "react-toastify";
import Link from "next/link";

function StatusUpdate({ unique, status }: { unique: string; status: "Pending" | "Processing" | "Shipping" | "Delivered" | "Rejected" | "Hold" | "Canceled" }) {
    const [loader, setLoader] = useState<boolean>(false);
    const [select, setSelect] = useState<"Pending" | "Processing" | "Shipping" | "Delivered" | "Rejected" | "Hold" | "Canceled">(status);
    const onChange = async (value: "Pending" | "Processing" | "Shipping" | "Delivered" | "Rejected" | "Hold" | "Canceled") => {
        setSelect(value);
        await update(unique, value);
    }
    const update = async (identifier: string, status: "Pending" | "Processing" | "Shipping" | "Delivered" | "Rejected" | "Hold" | "Canceled") => {
        setLoader(true);
        const res = await Fetch("/api/account/admin/orders/update", { method: "POST", body: { unique: identifier, status: status } });
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
                <option selected value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipping">Shipping</option>
                <option value="Delivered">Delivered</option>
                <option value="Rejected">Rejected</option>
                <option value="Hold">Hold</option>
                <option value="Canceled">Canceled</option>
            </select>
        </>
    )
}

export default function Orders() {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [select, setSelect] = useState<string>("Pending");
    const loadData = async (status?: string) => {
        setLoader(true);
        const res = await Fetch("/api/account/admin/orders", { method: "POST", body: { status } });
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
            <Seo title="Orders" />
            <Layout>
                <div className="box">
                    <div className="mb-3 grid grid-cols-2 gap-3 items-center">
                        <div>
                            <h1 className="text-xl md:text-3xl font-bold break-words">Orders</h1>
                        </div>
                        <div>
                            <select disabled={loader} value={select} onChange={(e) => { setSelect(e.target.value) }} className="inp-text" title="Select Options">
                                <option value="">All</option>
                                <option selected value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipping">Shipping</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Hold">Hold</option>
                                <option value="Canceled">Canceled</option>
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
                                        <td>{(item?.amount || 0) + "/" + ((item?.amount || 0) - (((item?.couponClient || 0) / 100) * (item?.amount || 0)))}</td>
                                        <td>{item?.invoice}</td>
                                        <td>{item?.product}</td>
                                        <td>{item?.phone}</td>
                                        <td>{item?.method}</td>
                                        <td>{item?.trxID}</td>
                                        <td className="flex gap-1.5">
                                            {/* {updateLoader ? <>
                                                <p>Please Wait...</p>
                                            </> : <>
                                                <button type="button" onClick={() => update(item?.unique!, "Pending")} disabled={updateLoader} className={`rounded-full ${item?.status === "Pending" ? "bg-orange-200 hover:bg-orange-600 hover:text-white" : "link"} active:scale-75 duration-200 px-1.5 py-0.5`} title="Pending"><i className="bi bi-clock"></i></button>
                                                <button type="button" onClick={() => update(item?.unique!, "Approved")} disabled={updateLoader} className={`rounded-full ${item?.status === "Approved" ? "bg-green-200 hover:bg-green-600 hover:text-white" : "link"} active:scale-75 duration-200 px-1.5 py-0.5`} title="Approve"><i className="bi bi-check-lg"></i></button>
                                                <button type="button" onClick={() => update(item?.unique!, "Rejected")} disabled={updateLoader} className={`rounded-full ${item?.status === "Rejected" ? "bg-red-200 hover:bg-red-600 hover:text-white" : "link"} active:scale-75 duration-200 px-1.5 py-0.5`} title="Reject"><i className="bi bi-x-lg"></i></button>
                                            </>} */}
                                            <Link className="link" href={"/my-account/admin/orders/" + item.unique}>Details</Link>
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