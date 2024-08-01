import FeaturesComponent from "@/components/features";
import { useEffect, useState } from "react";
import database from '@/database'
import Image from "next/image";
import { toast } from "react-toastify";
import Fetch from "@/fetch";

export default function Free() {
    const Gateway = database.gateway;
    const plans = database.plan;
    const currency = database.currency;
    const [products, setProducts] = useState<{ title: string; currency: string; price: number; } | null>(null);
    const [plan, setPlan] = useState<"BUSINESS" | "PREMIUM">("PREMIUM");
    const [discount, setDiscount] = useState<{ coupon: string; percentage: number } | null>();
    const [payable, setPayable] = useState<number>(plans[plan].price - (discount ? ((discount.percentage / 100) * plans[plan].price) : 0));
    const [method, setMethod] = useState<string>("");
    const [provider, setProvider] = useState<any>({});
    const [coupon, setCoupon] = useState<string>("");
    const [couponLoader, setCouponLoader] = useState<boolean>(false);
    const [confirmLoader, setConfirmLoader] = useState<boolean>(false);

    useEffect(() => {
        setPayable((plans[plan].price + (products?.price || 0)) - (discount ? ((discount.percentage / 100) * (plans[plan].price + (products?.price || 0))) : 0))
    }, [payable, discount, plans, plan, products?.price])
    const applyCoupon = async () => {
        setCouponLoader(true);
        const res = await Fetch("/api/account/coupon/match", { method: "POST", body: { code: coupon } });
        if (res.status === 200) {
            setDiscount({ coupon: res.body.code, percentage: res.body.client })
            toast.success("The coupon has been successfully applied.")
            setCouponLoader(false);
        } else {
            setDiscount(null);
            toast.error(res.body.message || "Something went wrong.");
            setCouponLoader(false);
        }
    }
    const confirm = async (event: any) => {
        event.preventDefault();
        setConfirmLoader(true);        
        if (method) {
            const data = {
                plan: plan,
                price: payable,
                coupon: coupon,
                name: event.target.name.value || "",
                phone: event.target.phone.value || "",
                address: event.target.address.value || "",
                product: products?.title || "",
                method: method,
                trxID: event.target.trxID?.value || "",
                provider: provider
            }
            const res = await Fetch("/api/account/upgrade", { method: "POST", body: data });
            if (res.status === 200) {
                setDiscount(null);
                setCoupon("");
                setMethod("");
                setProducts(null);
                setMethod("");
                event.target.reset();
                toast.success(res.body.message || "Your upgrade plan has been successfully submitted.");
            } else {
                toast.error(res.body.message || "Something went wrong.");
            }
            setConfirmLoader(false);
        } else {
            toast.error("Please select a payment method.");
            setConfirmLoader(false);
        }
    }
    return (
        <>
            <div className="box p-0 overflow-hidden mb-0">
                <div>
                    <h1 className="text-2xl text-center font-bold px-3 py-4 bg-white/50 mb-5">Upgrade Your Plan</h1>
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-2 px-3">
                            <button onClick={() => setPlan("PREMIUM")} className={`border-2 border-white px-5 py-5 font-bold text-lg rounded-l-full duration-300 ${plan === "PREMIUM" ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-white hover:bg-purple-600 hover:text-white"} active:scale-90`} type="button">Premium</button>
                            <button onClick={() => setPlan("BUSINESS")} className={`border-2 border-white px-5 md:px-10 py-5 font-bold text-lg rounded-r-full duration-300 ${plan === "BUSINESS" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-white hover:bg-yellow-500 hover:text-white"} active:scale-90`} type="button">Business</button>
                        </div>
                    </div>
                    <form onSubmit={confirm} className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-4">
                        <div>
                            <div className="bg-white/50 rounded-lg overflow-hidden">
                                <h2 className="px-3 py-2 bg-white/70 text-xl font-semibold">Details</h2>
                                <div className="p-3">
                                    <div className="bg-purple-200 p-3 rounded-xl mb-5">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="md:text-lg font-semibold">{plans[plan].plan + " Plan"}</h3>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold md:text-xl">{plans[plan].price + " " + plans[plan].currency}</h3>
                                            </div>
                                        </div>
                                        {products && <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="md:text-lg font-semibold">{products.title}</h3>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold md:text-xl">{products.price + " " + products.currency}</h3>
                                            </div>
                                        </div>}
                                        {discount && <div className="flex justify-between items-center pb-1">
                                            <div>
                                                <h3 className="md:text-lg font-semibold">{`Discount (${discount.percentage}%)`}</h3>
                                                <p className="text-xs">{discount.coupon}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold md:text-xl">{((discount.percentage / 100) * (plans[plan].price + (products?.price || 0))) + " " + plans[plan].currency}</h3>
                                            </div>
                                        </div>}
                                        <hr className="border rounded-full border-slate-400 my-1" />
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="md:text-lg font-bold">Payable</h3>
                                            </div>
                                            <div>
                                                <h3 className="font-bold md:text-xl">{payable + " " + plans[plan].currency}</h3>
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
                                    <div className="pt-5">
                                        <div className="w-full bg-white/50 rounded-lg overflow-hidden">
                                            <h4 className="p-3 bg-white font-semibold text-lg">Select Free Product</h4>
                                            <div className="p-3">
                                                <div className="grid grid-cols-1 gap-3 md:px-5 px-2">
                                                    {database.welcomeProducts.map((product, index) => {
                                                        return (<button key={index} onClick={() => products?.title === product.title ? setProducts(null) : setProducts(product)} className="flex justify-between items-center w-full bg-white/70 hover:bg-white px-3 py-3 duration-200 rounded-lg" type="button">
                                                            <span className="font-semibold"><span className="mr-2 font-bold text-purple-600">{product.price + product.currency}</span>{product.title}</span>
                                                            {products?.title === product.title && <i className="text-xl bi bi-check2-all"></i>}
                                                        </button>)
                                                    })}
                                                </div>
                                            </div>
                                        </div>
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
                                                <h4 className="pl-2 font-bold">{gateway.provider === "Cash on Delivery" ? "Offline Payment" : gateway.provider}</h4>
                                            </div>
                                            {gateway.provider === method && gateway.number && <>
                                                <div className="pt-3">
                                                    <div className="relative mb-3" onSubmit={applyCoupon}>
                                                        <input disabled={true} value={gateway.number} className="w-full h-10 bg-slate-600/10 py-2 pl-3 pr-16 outline-none duration-200 rounded-lg font-bold text-xl" type="text" placeholder="Phone Number" required />
                                                        <button className="absolute text-red-800 hover:text-red-900 top-0 h-10 right-0 py-2 px-3 rounded-r-lg font-bold active:scale-75 duration-200 flex justify-center items-center" onClick={() => { navigator.clipboard.writeText(gateway.number); toast.success("The number copied.") }} type="button">Copy</button>
                                                    </div>
                                                    <input className="w-full h-10 border-2 border-slate-400/30 hover:border-slate-400 hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold mb-2" type="text" name="trxID" placeholder="trxID" required />
                                                    <input className="w-full hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold" type="file" name="screenshot" placeholder="trxID" />
                                                </div>
                                            </>}
                                        </div>)
                                    })}
                                </div>
                                <div className="pt-5">
                                    <button disabled={confirmLoader} className="w-full bg-purple-600 hover:bg-purple-800 p-3 text-white rounded-lg text-base md:text-lg font-bold duration-200 active:scale-95 flex items-center justify-center" type="submit">{confirmLoader ? "Please wait..." : `Submit (${payable} Tk/${((payable + (products?.price || 0)) / currency.rate).toFixed(0)} USD)`}</button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <FeaturesComponent />
                        </div>
                    </form>
                </div>
            </div >
        </>
    );
}