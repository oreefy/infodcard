import Seo from "@/components/seo";
import Layout from "@/components/account";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Fetch from "@/fetch";
import { signOut } from "next-auth/react";

export default function MyAccountPage() {
    const [loader, setLoader] = useState<boolean>(true);
    const [updateLoader, setUpdateLoader] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>("");
    const [orders, setOrders] = useState<any[]>([]);
    const [email, setEmail] = useState<string>("");
    const [backupEmail, setBackupEmail] = useState<string>("");
    const [passwordLoader, setPasswordLoader] = useState<boolean>(false);
    const loadData = async () => {
        setLoader(true);
        const res = await Fetch("/api/account/user", {
            method: "POST"
        });
        if (res.status === 200) {
            setOrders(res.body.orders);
            setPhone(res.body.phone);
            setEmail(res.body.email);
            setBackupEmail(res.body.email);
            setLoader(false);
        } else {
            toast.error(res.body.message || "Something went wrong.");
            setLoader(false);
        }
    }
    useEffect(() => { loadData() }, []);
    const update = async (event: any) => {
        event.preventDefault();
        setUpdateLoader(true)
        const data = { phone: phone || "", email: email || "" }
        const res = await Fetch("/api/account/user/update", { method: "POST", body: data });
        if (res.status === 200) {
            if (backupEmail !== res.body.email) {
                signOut({ redirect: false, callbackUrl: "/login" });
            }
            toast.success(res.body.message || "Something went wrong.");
            setUpdateLoader(false);
        } else {
            toast.error(res.body.message || "Something went wrong.");
            setUpdateLoader(false);
        }
    }
    const change = async (event: any) => {
        event.preventDefault();
        setPasswordLoader(true)
        const data = { current: event.target.current.value || "", new: event.target.new.value || "" }
        const res = await Fetch("/api/account/user/change-password", { method: "POST", body: data });
        if (res.status === 200) {
            toast.success(res.body.message || "Something went wrong.");
            setPasswordLoader(false);
            event.target.reset();
        } else {
            toast.error(res.body.message || "Something went wrong.");
            setPasswordLoader(false);
        }
    }
    return (
        <>
            <Seo title="My Account" />
            <Layout>
                {loader && <span className='box w-full h-80 inline-block animate-pulse mb-3'></span>}
                {!loader && <div className="box p-0">
                    <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                        <h1 className="font-bold text-xl">Order History</h1>
                    </div>
                    <div className="p-3 md:p-4 lg:p-5 gap-3 overflow-auto">
                        <table className="w-full table table-auto">
                            <thead>
                                <tr>
                                    <th className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center min-w-[70px]">Date</th>
                                    <th className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center min-w-[100px]">Product</th>
                                    <th className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center min-w-[100px]">Design</th>
                                    <th className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center min-w-[100px]">Invoice</th>
                                    <th className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center min-w-[70px]">Status</th>
                                    <th className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center min-w-[200px]">Address</th>
                                    <th className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center min-w-[100px]">Gateway</th>
                                    <th className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center min-w-[70px]">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => {
                                    return (<tr className="hover:bg-white/50 duration-200" key={index}>
                                        <td className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center">{`${new Date(order.createdAt).getDate()}/${new Date(order.createdAt).getMonth()}/${new Date(order.createdAt).getFullYear()}`}</td>
                                        <td className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center">{order.product}</td>
                                        <td className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center">{order.design}</td>
                                        <td className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center">{order.invoice}</td>
                                        <td className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center">{order.status}</td>
                                        <td className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center">{order.address}</td>
                                        <td className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center">{order.method}</td>
                                        <td className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center">{order.amount}</td>
                                    </tr>
                                    )
                                })}
                                {!orders?.length ? <tr className="hover:bg-white/50 duration-200">
                                    <td colSpan={8} className="text-xs md:text-base px-1 py-1 border border-slate-500 text-center">No Order Found.</td>
                                </tr> : null}
                            </tbody>
                        </table>
                    </div>
                </div>}
                {!loader && <div className="box p-0">
                    <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                        <h1 className="font-bold text-xl">Manage Account</h1>
                    </div>
                    <div className="p-3 md:p-4 lg:p-5 grid grid-cols-1 gap-3">
                        <form className="grid grid-cols-1 gap-3" onSubmit={update}>
                            <div>
                                <input value={phone} onChange={(e: any) => setPhone(e.target.value || "")} className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600" type="tel" pattern="([0-9 +]){6,14}" placeholder="Phone Number" required />
                            </div>
                            <div>
                                <input value={email} onChange={(e: any) => setEmail(e.target.value || "")} min={0} max={150} maxLength={150} className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600" type="email" placeholder="Email Address" required />
                            </div>
                            <div>
                                <button disabled={updateLoader} className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-800 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">{updateLoader ? "Wait..." : "Update"}</button>
                            </div>
                        </form>
                    </div>
                </div>}
                <div className="box p-0 mb-0">
                    <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                        <h1 className="font-bold text-xl">Change Password</h1>
                    </div>
                    <div className="p-3 md:p-4 lg:p-5 grid grid-cols-1 gap-3">
                        <form className="grid grid-cols-1 gap-3" onSubmit={change}>
                            <div>
                                <input name="current" min={0} max={32} maxLength={32} className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600" type="password" placeholder="Current Password" required />
                            </div>
                            <div>
                                <input name="new" min={0} max={32} maxLength={32} className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600" type="password" placeholder="New Password" required />
                            </div>
                            <div>
                                <button disabled={passwordLoader} className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-800 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">{passwordLoader ? "Wait..." : "Update"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}