import Seo from "@/components/seo";
import Layout from "@/components/account/admin";

export default function Users() {
    return (
        <>
            <Seo title="Users" />
            <Layout>
                <div className="box">
                    <h1>Users</h1>
                </div>
            </Layout>
        </>
    );
}