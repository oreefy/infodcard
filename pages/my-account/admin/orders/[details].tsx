import Seo from "@/components/seo";
import Layout from "@/components/account/admin";
import { useEffect, useState } from "react";
import Fetch from "@/fetch";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";

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
                <option value="Pending">Pending</option>
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

export default function OrderDetails() {
    const router = useRouter();
    const [loader, setLoader] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState<any>(null);
    const loadData = async (identifier?: string) => {
        setLoader(true);
        const res = await Fetch("/api/account/admin/orders/find", { method: "POST", body: { unique: identifier } });
        if (res.status === 200) {
            setData(res.body.data);
            setLoader(false);
        } else if (res.status === 404) {
            setNotFound(true);
        } else {
            toast.error(res.body.message || "Something went wrong.");
        }
    }
    useEffect(() => {
        if (router.query.details) {
            loadData(router.query.details as string);
        }
    }, [router.query.details]);
    useEffect(() => {
        if (notFound) {
            router.push("/404");
        }
    }, [notFound, router]);
    return (
        <>
            <Seo title="Order Details" />
            <Layout>
                <div className="box">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold break-words">Order Details</h1>
                        {!loader && <ul>
                            <li>unique: {data?.unique}</li>
                            <li>status: <StatusUpdate status={data?.status} unique={data?.unique || ""} /></li>
                            <li>invoice: {data?.invoice}</li>
                            <li>product: {data?.product}</li>
                            <li>amount: {data?.amount}</li>
                            <li>name: {data?.name}</li>
                            <li>design: {data?.design}</li>
                            <li>front: {data?.front}</li>
                            <li>back: {data?.back}</li>
                            <li>accountNumber: {data?.accountNumber}</li>
                            <li>method: {data?.method}</li>
                            <li>phone: {data?.phone}</li>
                            <li>address: {data?.address}</li>
                            <li>screenshot: {data?.screenshot}</li>
                            <li>trxID: {data?.trxID}</li>
                            <li>text: {data?.text}</li>
                            <li>couponName: {data?.couponName}</li>
                            <li>couponPercentage: {data?.couponPercentage}</li>
                            <li>couponPartner: {data?.couponPartner}</li>
                            <li>couponClient: {data?.couponClient}</li>
                            <li>couponProviderUnique: {data?.couponProviderUnique}</li>
                            <li>authorUnique: {data?.authorUnique}</li>
                            <li>updatedAt: {data?.updatedAt}</li>
                            <li>createdAt: {data?.createdAt}</li>
                        </ul>}
                    </div>
                </div>
            </Layout>
        </>
    );
}