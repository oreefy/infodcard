import Seo from "@/components/seo";
import Layout from "@/components/account/admin";
import { useEffect, useState } from "react";
import Fetch from "@/fetch";
import { toast } from "react-toastify";

export default function ContactMessages() {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [collapse, setCollapse] = useState<string>("");
    const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
    const loadData = async () => {
        setLoader(true);
        const res = await Fetch("/api/account/admin/messages", { method: "POST" });
        if (res.status === 200) {
            setData(res.body.data);
            setLoader(false);
        } else {
            toast.error(res.body.message || "Something went wrong.");
        }
    }
    useEffect(() => { loadData() }, []);
    const deleteMessage = (unique: string) => {
        setDeleteLoader(true);
        Fetch("/api/account/admin/messages/delete", { method: "POST", body: { unique: unique } }).then((res) => {
            if (res.status === 200) {
                toast.success(res.body.message || "The message has been successfully deleted.")
            } else {
                toast.error(res.body.message || "Something went wrong.")
            }
            setDeleteLoader(false);
            loadData();
        })
    }
    return (
        <>
            <Seo title="Messages" />
            <Layout>
                {loader && <div className="w-full h-96 bg-white/50 rounded-2xl animate-pulse"></div>}
                {!loader && <div className="box p-0 mb-0">
                    <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                        <h1 className="font-bold text-xl">Messages</h1>
                        <button disabled={loader} onClick={() => loadData()} className="px-4 py-2 bg-white/70 tracking-wide rounded-lg hover:bg-white active:scale-90 duration-200 font-bold" type="button">Refresh</button>
                    </div>
                    <div className="p-3 md:p-4 lg:p-5 grid grid-cols-1 gap-3">
                        {
                            data.length >= 1 ? data.map((message: any, index: any) => {
                                return <div className="bg-white/30 rounded-lg overflow-hidden" key={index}>
                                    <div onClick={() => collapse === `${index}` ? setCollapse(``) : setCollapse(`${index}`)} className="p-3 bg-white/30 hover:bg-white/50 flex gap-3 items-center justify-between cursor-pointer duration-200">
                                        <h3 className="font-semibold text-lg line-clamp-1">{`${message.name}`}{collapse !== `${index}` && <span className="text-slate-600 text-xs">{` - ${message.number} - ${message.message}`}</span>}</h3>
                                        {collapse === `${index}` ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}

                                    </div>
                                    {collapse === `${index}` && <div className="p-3 md:p-4 lg:p-5">
                                        <p className="text-xl font-semibold border-b-2 border-slate-400 pb-1 mb-2">{message.number}</p>
                                        <p className="text-slate-800">{message.message}</p>
                                        <button disabled={deleteLoader} onClick={() => deleteMessage(message.unique)} className="px-4 py-2 tracking-wide active:scale-90 font-bold bg-red-500 hover:bg-red-700 text-white rounded-lg duration-200 text-xs float-right my-3 md:my-4 lg:my-5" type="button">{deleteLoader ? "Wait..." : "Delete"}</button>
                                    </div>}
                                </div>
                            }) : <div>
                                <p className="px-3 py-10 text-center">No Messages</p>
                            </div>
                        }
                    </div>
                </div>}
            </Layout>
        </>
    );
}