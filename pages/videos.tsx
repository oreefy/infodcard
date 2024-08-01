import Layout from "@/components/layout";
import Seo from "@/components/seo";
import { useEffect, useState } from "react";
import db from "@/database";
import YouTube from 'react-player'

export default function Videos() {
    const [isReady, setIsReady] = useState<boolean>(false);
    const videos = db.videos;
    useEffect(() => {
        setIsReady(true);
    }, [])
    return (
        <>
            <Seo title="Videos" />
            <Layout>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8 xl:gap-8 px-4">
                    {videos.map((video, index) => {
                        return (
                            <div key={index} className="overflow-hidden rounded-3xl h-52 md:h-48 bg-white/30">
                                {isReady && <YouTube
                                    width="100%"
                                    height="100%"
                                    url={video}
                                    controls={true}
                                />}
                            </div>
                        )
                    })}

                </div>
            </Layout>
        </>
    )
}
