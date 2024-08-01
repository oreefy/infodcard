import FreeUpgrade from "@/components/account/upgrade/free";
import PremiumUpgrade from "@/components/account/upgrade/premium";
import BusinessUpgrade from "@/components/account/upgrade/business";
import Seo from "@/components/seo";
import Layout from "@/components/account";
import { useSession } from "next-auth/react";

export default function Upgrade() {
    const { data: session } = useSession();
    return (
        <>
            <Seo title="Upgrade" />
            <Layout>
                {session?.user?.name === "FREE" && <FreeUpgrade />}
                {session?.user?.name === "PREMIUM" && <PremiumUpgrade />}
                {session?.user?.name === "BUSINESS" && <BusinessUpgrade />}
            </Layout>
        </>
    );
}