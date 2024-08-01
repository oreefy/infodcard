import Image from "next/image";

export default function Services({ services = [] }: { services: { image: string; title: string; message?: string; price?: string }[] }) {
    return (
        <>
            {
                services.length >= 1 && <section className="box">
                    <h2 className="font-extrabold p-2 rounded-xl flex items-center">
                        <i className="bi bi-person-workspace mr-3 px-3 py-2 rounded-full text-3xl bg-white/50"></i>
                        <span className="text-2xl uppercase">Services</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-2 mt-2 w-full">
                        {
                            services.map((product, index) => {
                                return <div key={index} className="bg-white/30 hover:bg-white/50 duration-200 rounded-xl">
                                    <Image className="w-full h-30 object-cover object-center rounded-t-lg" src={product.image} width={100} height={100} alt={product.title} />
                                    <div className="p-2">
                                        <h3 className="font-bold leading-4 text-medium break-words mb-1">{product.title}</h3>
                                        {product.message && <p className="text-xs break-words mb-2">{product.message}</p>}
                                        {
                                            product.price && <div className="text-center">
                                                <strong className="bg-lime-600 text-white py-0.5 px-5 rounded-full inline-block">{product.price}</strong>
                                            </div>
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </section>
            }
        </>
    );
}