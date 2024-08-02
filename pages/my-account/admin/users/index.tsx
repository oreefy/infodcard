import Seo from "@/components/seo";
import Layout from "@/components/account/admin";
import { useEffect, useState } from "react";
import Fetch from "@/fetch";
import { toast } from "react-toastify";
import { error } from "console";

export default function Users() {
    const [loader, setLoader] = useState(true);
    const [users, setUsers] = useState<any[]>([]);
    const loadData = async () => {
        setLoader(true);
        const res = await Fetch("/api/account/admin/users", { method: "POST" });
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
    return (
        <>
            <Seo title="Users" />
            <Layout>
                <div className="box">
                    {loader && "Loading..."}
                    {!loader && <table>
                        <thead>
                            <th>Email</th>
                            <th>Phone</th>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                return <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>{user?.phone}</td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </Layout>
        </>
    );
}