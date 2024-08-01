import Seo from "@/components/seo";
import Layout from "@/components/account/admin";

export default function Orders() {
    return (
        <>
            <Seo title="Orders" />
            <Layout>
                <div className="box">
                    <h1>Orders</h1>
                </div>
            </Layout>
        </>
    );
}