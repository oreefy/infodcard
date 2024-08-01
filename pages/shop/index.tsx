import Layout from "@/components/layout";
import Seo from "@/components/seo";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import db from "@/database";


function ProductImage({ images }: { images: any[] }) {
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

export default function Shop() {
    const [products] = useState<any[] | null>(db.products);
    return (
        <>
            <Seo
                title="Products"
            />
            <Layout>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 duration-200 mb-4">
                    {
                        products && products.length <= 0 && <div className="box text-center">
                            <p className="py-10 px-3">No Products found.</p>
                        </div>
                    }
                    {
                        products && products.length >= 1 && products.map((product, index) => {
                            return (
                                <div className="bg-white/60 text-center overflow-hidden rounded-2xl" key={index}>
                                    <ProductImage images={product.images} />
                                    <h2 className="font-bold text-xl px-3">{product.title}</h2>
                                    <div className="px-3 pb-3">
                                        <p className="text-2xl font-bold text-purple-700 mt-1">{product.price}{product.currency}</p>
                                        <p className="mb-3 font-semibold text-gray-800"><del>{product.discount}{product.currency}</del></p>
                                        <Link href={`/shop/${product.path}`} className="px-6 py-2 bg-orange-600 hover:bg-orange-700 duration-200 active:scale-90 text-white font-bold rounded-xl inline-block">Buy Now</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Layout>
        </>
    )
}
