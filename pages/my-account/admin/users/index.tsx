import Seo from "@/components/seo";
import Layout from "@/components/account/admin";
import { useEffect, useState } from "react";
import Fetch from "@/fetch";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Users() {
    const [loader, setLoader] = useState(true);
    const [users, setUsers] = useState<any[]>([]);
    const [select, setSelect] = useState<string>("");
    const loadData = async (plan?: string) => {
        setLoader(true);
        const res = await Fetch("/api/account/admin/users", { method: "POST", body: { plan } });
        if (res.status === 200) {
            setUsers(res.body.users);
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
            <Seo title="Users" />
            <Layout>
                <div className="box">
                    <div className="mb-3 grid grid-cols-2 gap-3">
                        <div>
                            <h1 className="text-3xl font-bold">Users</h1>
                        </div>
                        <div>
                            <select disabled={loader} value={select} onChange={(e) => { setSelect(e.target.value) }} className="inp-text" title="Select Options">
                                <option value="">All</option>
                                <option value="FREE">FREE</option>
                                <option value="PREMIUM">PREMIUM</option>
                                <option value="BUSINESS">BUSINESS</option>
                            </select>
                        </div>
                    </div>
                    {loader && <div className="w-full h-96 bg-white/50 rounded-2xl animate-pulse"></div>}
                    {!loader && <div className="table-box scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th className="min-w-40">Joined</th>
                                    <th className="min-w-32">Plan</th>
                                    <th className="min-w-64">Email</th>
                                    <th className="min-w-32">Phone</th>
                                    <th className="min-w-52">Code</th>
                                    <th className="min-w-40">Ads</th>
                                    <th className="min-w-20">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => {
                                    return <tr key={index}>
                                        <td>{`${new Date(user?.createdAt).toDateString()}`}</td>
                                        <td>{`${user?.plan}${user?.profileLength && " (" + user?.profileLength + ")"}`}</td>
                                        <td>{user.email}</td>
                                        <td>{user?.phone}</td>
                                        <td>{user?.code}</td>
                                        <td>{`${new Date(user?.ads).toDateString()}`}</td>
                                        <td>
                                            <Link className="link" href={"/my-account/admin/users/" + user.unique}>Details</Link>
                                        </td>
                                    </tr>
                                })}
                                {!users.length ? <tr><td className="!text-center bg-white/0" colSpan={7}>Not Found</td></tr> : ""}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </Layout>
        </>
    );
}