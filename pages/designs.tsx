import Layout from "@/components/layout";
import Seo from "@/components/seo";
import Image from "next/image";
import Link from "next/link";
import db from "@/database";
import { useState } from "react";
import Product from "./my-account/profile/gallery";

function DesignImage({ images }: { images: any[] }) {
    const [current, setCurrent] = useState<string>(images[0]);
    return (
        <>
            <Image className="w-full h-52 object-cover object-center" src={current || "/default/product.png"} width={200} height={200} alt="Product Image" />
            <div className="mt-3">
                {images.map((image, index) => {
                    return (
                        <button key={index} onClick={() => setCurrent(image)} title="Toggle Image" className="p-1" type="button"><i className={current === images[index] ? "bi bi-circle-fill" : "bi bi-circle"}></i></button>
                    )
                })}
            </div>
        </>
    )
}

export default function Designs() {
    return (
        <>
            <Seo title="Designs" />
            <Layout>
                {db.designs && db.designs.length <= 0 && <div className="box text-center">
                    <p className="py-10 px-3">No design found.</p>
                </div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 duration-200 mb-4">
                    {db.designs && db.designs.length >= 1 && db.designs.map((design, index) => {
                        return (
                            <div className="bg-white/60 text-center overflow-hidden rounded-2xl" key={index}>
                                <DesignImage images={design.images} />
                                <h2 className="font-bold text-xl pt-2 px-3 mb-4">{design.title}</h2>
                            </div>
                        )
                    })}
                </div>
            </Layout>
        </>
    )
}
