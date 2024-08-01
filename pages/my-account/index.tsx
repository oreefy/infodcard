import Seo from "@/components/seo";
import Layout from "@/components/account";
import Link from "next/link";
import ProfileLink from '@/components/account/ProfileLink'
import { useSession } from "next-auth/react";


export default function Dashboard() {
    const { data: session, status } = useSession();
    return (
        <>
            <Seo title="Dashboard" />
            <Layout>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center items-center">
                    <ProfileLink image="/default/manage.png" title="Manage Profiles" link={"/my-account/profile"} />
                    <ProfileLink image="/default/custom.png" title="Custom Field" link="/my-account/custom" />
                    <ProfileLink image="/default/inbox.png" title="Inbox" link="/my-account/message" />
                    <ProfileLink image="/default/product.png" title="Produts" link="/my-account/profile/product" />
                    <div className="box col-span-2 p-2 mb-0 grid grid-cols-2 gap-2 items-center">
                        <ProfileLink image="/default/bank.png" title="Bank's" link="/my-account/profile/mobile-bank" />
                        <div>
                            <Link href={"/my-account/profile/mobile-bank"} className="bg-white/40 block text-center rounded-xl p-2 active:scale-90 duration-200 mb-2">{`Mobile`}</Link>
                            <Link href={"/my-account/profile/local-bank"} className="bg-white/40 block text-center rounded-xl p-2 active:scale-90 duration-200 mb-2">{`Local`}</Link>
                            <Link href={"/my-account/profile/global-bank"} className="bg-white/40 block text-center rounded-xl p-2 active:scale-90 duration-200">{`Global`}</Link>
                        </div>
                    </div>
                    <ProfileLink image="/default/service.png" title="Services" link="/my-account/profile/service" />
                    <ProfileLink image="/default/albums.png" title="Gallery" link="/my-account/profile/gallery" />
                    <ProfileLink image="/default/account.png" title="My Account" link="/my-account/account" />
                    <ProfileLink image="/default/earning.png" title="Earning" link="/my-account/earning" />
                    {status === "authenticated" && session.user?.name === "PREMIUM" && <ProfileLink image="/default/upgrade.png" title="Upgrade" link="/my-account/upgrade" />}
                    {status === "authenticated" && session.user?.name === "BUSINESS" && <ProfileLink image="/default/upgrade.png" title="Extend" link="/my-account/upgrade" />}
                    <ProfileLink image="/default/support.png" title="Support" link="/my-account/support" />
                </div>
            </Layout >
        </>
    );
}