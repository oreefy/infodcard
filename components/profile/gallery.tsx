import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images = [] }: { images: { image: string }[] }) {
    const [previwer, setPreviwer] = useState<string>("");
    return (
        <>
            {
                previwer && <div className="fixed top-5 bottom-20 left-5 right-5 z-50 bg-black/80 rounded-3xl shadow-xl shadow-black/50 flex justify-center items-center">
                    <button className="bg-orange-600 ring-2 ring-white px-3 font-extrabold text-white py-2 float-right fixed top-10 right-10 rounded-md shadow-md shadow-white/30" type="button" onClick={() => setPreviwer("")}>Close</button>
                    <Image className="w-auto h-auto object-cover object-center rounded-lg" src={"/uploads/default-product.jpg"} width={1000} height={1000} alt={previwer} />
                </div>
            }
            {images.length >= 1 && <section className="box">
                <h2 className="font-extrabold p-2 rounded-xl flex items-center">
                    <i className="bi bi-card-image mr-3 px-3 py-2 rounded-full text-3xl bg-white/50"></i>
                    <span className="text-2xl uppercase">Gallery</span>
                </h2>
                <div className="grid grid-cols-3 gap-2 mt-2 w-full">
                    {
                        images.map((image, index) => {
                            return <div key={index} className="duration-200 active:scale-90 hover:scale-90 rounded-xl">
                                <button type="button" onClick={() => setPreviwer(image.image)} title="Action">
                                    <Image className="w-full h-20 object-cover object-center rounded-lg" src={image.image} width={100} height={100} alt={image.image} />
                                </button>
                            </div>
                        })
                    }
                </div>
            </section>}
        </>
    );
}