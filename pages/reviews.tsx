import Layout from "@/components/layout";
import Seo from "@/components/seo";
import Image from "next/image";
import Link from "next/link";

export default function Reviews() {
    return (
        <>
            <Seo title="Reviews" />
            <Layout>
                <div className="box">
                    <h1 className="font-bold">Welcome to Infod Card</h1>
                    <p>Reviews page</p>
                </div>
            </Layout>
        </>
    )
}
