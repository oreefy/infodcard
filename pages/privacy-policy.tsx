import Layout from "@/components/layout";
import Seo from "@/components/seo";
import db from "@/database";

export default function PrivacyPolicy() {
    return (
        <>
            <Seo title="PrivacyPolicy" />
            <Layout>
                <div className="box">
                    <h1 className="font-bold">{db.privacy.title}</h1>
                    <p>Last Update: {db.privacy.update}</p>
                </div>
                {db.privacy.topics.map((topic, index) => {
                    return (<div className="box" key={index}>
                        <h2 className="font-bold">{topic.title}</h2>
                        <p>{topic.message}</p>
                    </div>)
                })}
            </Layout>
        </>
    )
}
