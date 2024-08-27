import Seo from "@/components/seo";
import Layout from "@/components/account/admin";
import { useEffect, useState } from "react";
import Fetch from "@/fetch";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function UserDetails() {
    const [data, setData] = useState<any>(null);
    const [loader, setLoader] = useState<boolean>(true);
    const [notfound, setNotfound] = useState<boolean>(false);
    const router = useRouter();

    async function loadData(unique: string): Promise<void> {
        setLoader(true);
        const res = await Fetch("/api/account/admin/users/user", {
            method: "POST",
            body: { unique: unique }
        });
        if (res.status === 200) {
            setData(res.body);
            setLoader(false);
        } else if (res.status === 404) {
            setNotfound(true);
        } else {
            toast.error(res.body.message || "Something went wrong.");
        }
    }
    if (notfound) { router.push("/404") }
    useEffect(() => {
        if (router.query.details) {
            loadData(router.query.details as string);
        }
    }, [router.query.details]);

    return (
        <>
            <Seo title="User Details" />
            <Layout>
                {loader && <div className="box min-h-96 animate-pulse"></div>}
                {!loader && <div>
                    <div className="box">
                        <h1>User Details</h1>
                        <ul>
                            <li>{`Ads: ${new Date(data.ads).toLocaleDateString()}`}</li>
                            <li>{`Phone: ${data.phone}`}</li>
                            <li>{`Email: ${data.email}`}</li>
                            <li>{`Code: ${data.code}`}</li>
                            <li>{`Plan: ${data.plan}`}</li>
                            <li>{`Profile Length: ${data.profileLength}`}</li>
                            <li>{`CreatedAt: ${new Date(data.createdAt).toLocaleDateString()}`}</li>
                        </ul>
                    </div>
                    <div className="box">
                        <h1>Profiles ({data.profile.length})</h1>
                        <ul>
                            {
                                data.profile.map((item: any, index: number) => {
                                    return (<li key={index}>
                                        {`Name: ${item.name}`}
                                    </li>)
                                })
                            }
                        </ul>
                    </div>
                    <div className="box">
                        <h1>Income History</h1>
                    </div>
                    <div className="box">
                        <h1>Coupon</h1>
                    </div>
                    <div className="box">
                        <h1>Coupon Usages History</h1>
                    </div>
                    <div className="box">
                        <h1>Messages</h1>
                    </div>
                    <div className="box">
                        <h1>Upgrade History</h1>
                    </div>
                    <div className="box">
                        <h1>Orders</h1>
                    </div>
                    <div className="box">
                        <h1>Withdraw</h1>
                    </div>
                </div>}
            </Layout>
        </>
    );
}