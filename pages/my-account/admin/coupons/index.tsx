import Seo from "@/components/seo";
import Layout from "@/components/account/admin";
import { useEffect, useState } from "react";
import Fetch from "@/fetch";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Coupons() {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [global, setGlobal] = useState<any>(null);
    const [select, setSelect] = useState<string>("");
    const loadData = async () => {
        setLoader(true);
        const res = await Fetch("/api/account/admin/coupons", { method: "POST" });
        if (res.status === 200) {
            setData(res.body.data);
            setGlobal(res.body.global);
            setLoader(false);
        } else {
            toast.error(res.body.message || "Something went wrong.");
        }
    }
    useEffect(() => { loadData() }, []);
    useEffect(() => { loadData() }, [select]);
    return (
        <>
            <Seo title="Coupons" />
            <Layout>
                <div className="box">
                    <div className="mb-3 grid grid-cols-2 gap-3 items-center">
                        <div>
                            <h1 className="text-xl md:text-3xl font-bold break-words">Coupons</h1>
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
                                    <th className="min-w-64">Author</th>
                                    <th>Code</th>
                                    <th>Type</th>
                                    <th>Percentage</th>
                                    <th>Partner</th>
                                    <th>Client</th>
                                    <th className="min-w-20">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item?.email}</td>
                                        <td>{item?.code}</td>
                                        <td>{item?.coupon ? item.coupon.custom ? item.coupon.global ? "Global" : "Custom" : "Default" : "Default"}</td>
                                        <td>{item?.coupon ? item.coupon.custom ? item.coupon.percentage : global.percentage : global.percentage}</td>
                                        <td>{item?.coupon ? item.coupon.custom ? item.coupon.partner : global.partner : global.partner}</td>
                                        <td>{item?.coupon ? item.coupon.custom ? item.coupon.client : global.client : global.client}</td>
                                        <td className="flex gap-1.5">
                                            <Link className="link" href={"/my-account/admin/users/" + item.unique}>Details</Link>
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