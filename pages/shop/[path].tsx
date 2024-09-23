import Seo from "@/components/seo";
import db from "@/database";
import Layout from "@/components/layout";
import NotFound from "@/pages/404";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import database from '@/database'
import { toast } from "react-toastify";
import Fetch from "@/fetch";
import { useSession } from "next-auth/react";

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

export default function ShopProduct() {
    const router = useRouter()
    const { status } = useSession();
    const [product, setProduct] = useState<null | { path: string; title: string; images: string[]; description: string; currency: string; price: number; discount: number; category: string; custom: boolean }>(null);
    const [loader, setLoader] = useState<boolean>(true);
    const [found, setFound] = useState<"loading" | "found" | "notfound">("loading");
    const [design, setDesign] = useState<string>("");
    const Gateway = database.gateway;
    const currency = database.currency;
    const [discount, setDiscount] = useState<{ coupon: string; percentage: number } | null>();
    const [payable, setPayable] = useState<number>((product?.price || 0) - (discount ? ((discount.percentage / 100) * (product?.price || 0)) : 0));
    const [method, setMethod] = useState<string>("");
    const [provider, setProvider] = useState<any>({});
    const [coupon, setCoupon] = useState<string>("");
    const [couponLoader, setCouponLoader] = useState<boolean>(false);
    const [confirmLoader, setConfirmLoader] = useState<boolean>(false);
    useEffect(() => {
        db.designs.map((design) => {
            if (product?.category === design.category) {
                setFound("found");
            }
            if (found === "loading") {
                setFound("notfound");
            }
        })
    }, [product?.category, found]);
    useEffect(() => {
        setPayable((product?.price || 0) - (discount ? ((discount.percentage / 100) * (product?.price || 0)) : 0));
    }, [coupon, discount, product?.price]);
    useEffect(() => {
        if (router.query.path !== undefined) {
            db.products.map(((product) => {
                if (product.path === router.query.path) {
                    setPayable(product.price);
                    setProduct(product);
                }
                setLoader(false);
            }));
        }
    }, [router.query.path])
    const applyCoupon = async () => {
        setCouponLoader(true);
        const res = await Fetch("/api/account/coupon/match", { method: "POST", body: { code: coupon } });
        if (res.status === 200) {
            setDiscount({ coupon: res.body.code, percentage: res.body.client });
            toast.success("The coupon has been successfully applied.")
            setCouponLoader(false);
        } else {
            setDiscount(null);
            toast.error(res.body.message || "Something went wrong.");
            setCouponLoader(false);
        }
    }
    useEffect(() => {
        if (router.query.reference) {
            setCouponLoader(true);
            Fetch("/api/account/coupon/match", { method: "POST", body: { code: router.query.reference } }).then((res) => {
                if (res.status === 200) {
                    setDiscount({ coupon: res.body.code, percentage: res.body.client });
                    setCouponLoader(false);
                } else {
                    setDiscount(null);
                    setCouponLoader(false);
                }
            });
        }
    }, [router.query.reference])
    const confirm = async (event: any) => {
        event.preventDefault();
        setConfirmLoader(true);
        if (method) {
            const data = {
                price: product?.price || "",
                coupon: coupon,
                name: event.target.name.value || "",
                phone: event.target.phone.value || "",
                address: event.target.address.value || "",
                title: product?.title || "",
                design: design,
                // front: event.target.front,
                // back: event.target.back,
                method: method,
                trxID: event.target.trxID?.value || "",
                provider: provider
            }
            const res = await Fetch("/api/account/orders/create", { method: "POST", body: data });
            if (res.status === 200) {
                setDiscount(null);
                setDesign("");
                setCoupon("");
                setMethod("");
                event.target.name.value = "";
                event.target.phone.value = "";
                event.target.address.value = "";
                if (event.target?.trxID?.value) {
                    event.target.trxID.value = "";
                }
                if (status === "authenticated") {
                    router.push("/my-account/account");
                }
                toast.success(res.body.message || "Your order has been successfully created.");
            } else {
                toast.error(res.body.message || "Something went wrong.");
            }
            setConfirmLoader(false);
        } else {
            toast.error("Please select a payment method.");
            setConfirmLoader(false);
        }
    }
    return <>
        {loader && <Seo title="Loading..." />}
        {!loader && !product && <Seo title="404 - Not Found" />}
        {!loader && product && <Seo title={product.title} />}
        {loader && <Layout><span className='bg-white/50 rounded-xl w-full h-96 inline-block animate-pulse'></span></Layout>}
        {!loader && !product && <NotFound />}
        {!loader && product && <Layout>
            <form onSubmit={confirm}>
                <div className="box p-0 overflow-hidden mb-3">
                    <h1 className="text-xl text-center font-semibold px-3 py-4 bg-white/50">Select Design</h1>
                    <div className="p-3">
                        {found === "notfound" && <div className="box text-center mb-0"><p className="py-10 px-3">No design available for this product.</p></div>}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 duration-200">
                            {product.custom && <div>
                                <div className={`${design === "custom" ? "ring-4 ring-purple-900 bg-purple-700 text-white" : "bg-white/50"} text-center overflow-hidden rounded-2xl min-h-full relative`}>
                                    <h2 className="bg-white/80 font-semibold w-full py-4 text-xl text-black">Custom Design</h2>
                                    <div className="p-3 pt-4 text-black">
                                        <div className="bg-white/70 rounded-lg overflow-hidden mb-3">
                                            <h4 className="text-lg text-start font-semibold bg-white w-full p-3 ">Front Side</h4>
                                            <input className="w-full py-2 px-3 outline-none duration-200 rounded-lg font-bold" type="file" name="front" placeholder="Front Side" accept="image/png, image/jpeg, application/pdf" required={design === "custom" ? true : false} />
                                        </div>
                                        <div className="bg-white/70 rounded-lg overflow-hidden mb-10">
                                            <h4 className="text-lg text-start font-semibold bg-white w-full p-3 ">Back Side</h4>
                                            <input className="w-full py-2 px-3 outline-none duration-200 rounded-lg font-bold" type="file" name="back" placeholder="Back Side" accept="image/png, image/jpeg, application/pdf" required={design === "custom" ? true : false} />
                                        </div>
                                    </div>
                                    <button className={`${design === "custom" ? "bg-white/50 text-black hover:bg-white" : "bg-white hover:bg-purple-800 hover:text-white"} font-semibold absolute bottom-0 left-0 right-0 px-4 py-2 active:scale-90 duration-200`} onClick={() => setDesign(design === "custom" ? "" : "custom")} type="button">{design === "custom" ? "Selected" : "Select"}</button>
                                </div>
                            </div>}
                            {db.designs && db.designs.length >= 1 && db.designs.map((item, index) => {
                                if (product.category === item.category) {
                                    return (
                                        <div key={index}>
                                            <div className={`${design === item.title ? "ring-4 ring-purple-900 bg-purple-700 text-white" : "bg-white/50"} text-center overflow-hidden rounded-2xl`}>
                                                <DesignImage images={item.images} />
                                                <div className="p-3 pt-0">
                                                    <h2 className="font-semibold pt-2 mb-2">{item.title}</h2>
                                                </div>
                                                <button className={`${design === item.title ? "bg-white/50 text-black hover:bg-white" : "bg-white hover:bg-purple-800 hover:text-white"} font-semibold w-full px-4 py-2 active:scale-90 duration-200`} onClick={() => setDesign(design === item.title ? "" : item.title)} type="button">{design === item.title ? "Selected" : "Select"}</button>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div>
                        <div className="bg-white/50 rounded-lg overflow-hidden">
                            <h2 className="px-3 py-2 bg-white/70 text-xl font-semibold">Details</h2>
                            <div className="p-3">
                                <div className="bg-purple-200 p-3 rounded-xl mb-5">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="md:text-lg font-semibold">{product.title}</h3>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold md:text-xl">{product.price + " " + product.currency}</h3>
                                        </div>
                                    </div>
                                    {discount && <div className="flex justify-between items-center pb-1">
                                        <div>
                                            <h3 className="md:text-lg font-semibold">{`Discount (${discount.percentage}%)`}</h3>
                                            <p className="text-xs">{discount.coupon}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold md:text-xl">{((discount.percentage / 100) * product.price) + " " + product.currency}</h3>
                                        </div>
                                    </div>}
                                    <hr className="border rounded-full border-slate-400 my-1" />
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="md:text-lg font-bold">Payable</h3>
                                        </div>
                                        <div>
                                            <h3 className="font-bold md:text-xl">{payable + " " + product.currency}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    {discount ? <div className="relative">
                                        <input value={discount?.coupon} className="w-full h-10 bg-slate-900/30 py-2 pl-3 pr-16 outline-none duration-200 rounded-lg font-bold text-slate-600" type="text" name="coupon" placeholder="Coupon Code" />
                                        <button disabled={couponLoader} className="absolute text-red-800 hover:text-red-900 top-0 h-10 right-0 py-2 px-3 rounded-r-lg font-bold active:scale-75 duration-200 flex justify-center items-center" onClick={() => { setDiscount(null); setCoupon(""); toast.success("The coupon has been successfully removed.") }} type="button">Remove</button>
                                    </div> : <div className="relative">
                                        <input disabled={couponLoader} value={coupon} onChange={(e: any) => setCoupon(e.target.value || "")} className="w-full h-10 bg-white hover:bg-slate-100 py-2 pl-3 pr-16 outline-none duration-200 rounded-lg font-bold" type="text" name="coupon" placeholder="Coupon Code" />
                                        <button disabled={couponLoader} className="absolute hover:text-purple-700 top-0 h-10 right-0 py-2 px-3 rounded-r-lg font-bold active:scale-75 duration-200 flex justify-center items-center disabled:text-slate-600" onClick={applyCoupon} type="button">{couponLoader ? <span className="w-5 h-5 bg-slate-600 rounded-full inline-block animate-pulse"></span> : "Apply"}</button>
                                    </div>}
                                </div>
                                <div>
                                    <div className="mb-3"><input className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold" type="text" name="name" placeholder="Full Name" maxLength={150} required /></div>
                                    <div className="mb-3"><input className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold" type="tel" pattern="([0-9 +]){6,14}" name="phone" placeholder="Phone Number" required /></div>
                                    <textarea maxLength={220} className="w-full h-28 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold resize-none" name="address" placeholder="Address: Village, Thana, District, Post Office - Post Code, City, Division." required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/50 rounded-lg overflow-hidden">
                        <h2 className="px-3 py-2 bg-white/70 text-xl font-semibold">Checkout</h2>
                        <div className="p-3">
                            <div className="grid grid-cols-1 gap-3">
                                {Gateway.map((gateway, index) => {
                                    return (<div onClick={() => { setMethod(gateway.provider); setProvider(gateway) }} key={index} className={`cursor-pointer inline-block w-full p-3 rounded-lg duration-200 border-2 ${method === gateway.provider ? "bg-white border-green-400" : "bg-white/50 hover:bg-white border-white/50"}`}>
                                        <div className="flex items-center w-full">
                                            <Image src={gateway.logo} className="w-5 h-5 object-cover object-center" width={100} height={100} alt={gateway.provider} />
                                            <h4 className="pl-2 font-bold">{gateway.provider}</h4>
                                        </div>
                                        {gateway.provider === method && gateway.number && <>
                                            <div className="pt-3">
                                                <div className="relative mb-3" onSubmit={applyCoupon}>
                                                    <input disabled={true} value={gateway.number} className="w-full h-10 bg-slate-600/10 py-2 pl-3 pr-16 outline-none duration-200 rounded-lg font-bold text-xl" type="text" placeholder="Phone Number" required />
                                                    <button className="absolute text-red-800 hover:text-red-900 top-0 h-10 right-0 py-2 px-3 rounded-r-lg font-bold active:scale-75 duration-200 flex justify-center items-center" onClick={() => { navigator.clipboard.writeText(gateway.number); toast.success("The number copied.") }} type="button">Copy</button>
                                                </div>
                                                <input className="w-full h-10 border-2 border-slate-400/30 hover:border-slate-400 hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold mb-2" type="text" name="trxID" placeholder="trxID" required />
                                                <input className="w-full hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold" type="file" name="screenshot" placeholder="Screenshot" />
                                            </div>
                                        </>}
                                    </div>)
                                })}
                            </div>
                            <div className="pt-5">
                                <button disabled={confirmLoader} className="w-full bg-purple-600 hover:bg-purple-800 p-3 text-white rounded-lg text-base md:text-lg font-bold duration-200 active:scale-95 flex items-center justify-center" type="submit">{confirmLoader ? "Please wait..." : `Order (${payable} Tk/${(payable / currency.rate).toFixed(0)} USD)`}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>}

    </>

}
