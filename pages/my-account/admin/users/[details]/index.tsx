import Seo from "@/components/seo";
import Layout from "@/components/account/admin";

export default function UserDetails() {
    return (
        <>
            <Seo title="User Details" />
            <Layout>
                <div className="box">
                    <h1>User Details</h1>
                </div>
            </Layout>
        </>
    );
}