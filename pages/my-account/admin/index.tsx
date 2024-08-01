import Seo from "@/components/seo";
import Layout from "@/components/account/admin";
import Link from "next/link";

const menu = [
    { title: "Notifications", icon: "bell", link: "/my-account/admin/notifications" },
    { title: "Orders", icon: "box", link: "/my-account/admin/orders" },
    { title: "Upgrade", icon: "coin", link: "/my-account/admin/upgrades" },
    { title: "Admin Messages", icon: "chat", link: "/my-account/admin/admin-messages" },
    { title: "Contact Messages", icon: "chat-dots", link: "/my-account/admin/contact-messages" },
    { title: "Coupon", icon: "percent", link: "/my-account/admin/coupons" },
    { title: "Profiles", icon: "person-vcard", link: "/my-account/admin/profiles" },
    { title: "Withdraw", icon: "cash", link: "/my-account/admin/withdrawns" },
    { title: "Users", icon: "people", link: "/my-account/admin/users" },
    { title: "Advertisement", icon: "layout-text-window", link: "/my-account/admin/ads" },
    { title: "Mail", icon: "envelope", link: "/my-account/admin/mail" },
]

function Card({ list }: { list: { title: string, icon: string, link: string }[] }) {
    return <>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
            {list.map((item, index) => {
                return <div key={index} className="box mb-0">
                    <div className="mb-2 text-center">
                        <i className={`bi bi-${item.icon} text-4xl`}></i>
                        <h2 className="font-bold text-lg">{item.title}</h2>
                    </div>
                    <div className="text-center">
                        <Link className="bg-black hover:bg-blue-900 text-white px-5 py-1 rounded-full font-semibold active:scale-90 inline-block duration-200 m-0.5" href={item.link}>Manage</Link>
                    </div>
                </div>
            })}
        </div>
    </>
}

export default function AdminDashboard() {
    return (
        <>
            <Seo title="Admin Dashboard" />
            <Layout>
                <Card list={menu} />
            </Layout>
        </>
    );
}