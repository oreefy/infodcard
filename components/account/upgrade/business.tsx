import FeaturesComponent from "@/components/features";
import { useState } from "react";
import database from '@/database'
import Image from "next/image";
import { toast } from "react-toastify";
import Fetch from "@/fetch";

export default function Business() {
    const Gateway = database.gateway;
    const plans = database.plan;
    const currency = database.currency;
    const plan = "EXTEND";
    const [counter, setCounter] = useState<number>(5);
    const [discount, setDiscount] = useState<{ coupon: string; percentage: number } | null>();
    const [payable, setPayable] = useState<number>((plans[plan].price * counter) - (discount ? ((discount.percentage / 100) * plans[plan].price) : 0));
    const [method, setMethod] = useState<string>("");
    const [provider, setProvider] = useState<any>({});
    const [coupon, setCoupon] = useState<string>("");
    const [couponLoader, setCouponLoader] = useState<boolean>(false);
    const [confirmLoader, setConfirmLoader] = useState<boolean>(false);
    const updatePlan = (operation: "add" | "remove") => {
        if (operation === "add") { setCounter(counter <= 999 ? (counter + 1) : counter) }
        if (operation === "remove") { setCounter(counter >= 2 ? (counter - 1) : 1) }
        setPayable((plans[plan].price * counter) - (discount ? ((discount.percentage / 100) * plans[plan].price) : 0))
    }
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
                plan: "BUSINESS",
                price: plans[plan].price,
                quantity: counter,
                coupon: coupon,
                name: event.target.name.value || "",
                phone: event.target.phone.value || "",
                address: event.target.address.value || "",
                method: method,
                trxID: event.target.trxID?.value || "",
                provider: provider
            }
            const res = await Fetch("/api/account/upgrade", { method: "POST", body: data });
            if (res.status === 200) {
                setDiscount(null);
                setCoupon("");
                setMethod("");
                setMethod("");
                event.target.name.value = "";
                event.target.phone.value = "";
                event.target.address.value = "";
                if (event.target?.trxID?.value) {
                    event.target.trxID.value = "";
                }
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
                <h1 className="text-2xl text-center font-bold px-3 py-4 bg-white/50">Extend Profiles</h1>
                <form onSubmit={confirm} className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3">
                    <div>
                        <div className="bg-white/50 rounded-lg overflow-hidden">
                            <h2 className="px-3 py-2 bg-white/70 text-xl font-semibold">Details</h2>
                            <div className="p-3">
                                <div className="bg-purple-200 p-3 rounded-xl mb-5">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="md:text-lg font-semibold flex items-center justify-center mb-2"><span className="bg-purple-600 text-white flex justify-center items-center w-[40px] h-[40px] min-w-[40px] rounded-full text-xl">{counter}</span><span className="pl-2 flex flex-wrap gap-2 items-center">{plans[plan].plan + " Profiles"}<span className="text-sm">{`(${counter}x${plans[plan].price})`}</span></span></h3>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold md:text-xl">{(plans[plan].price * counter) + " " + plans[plan].currency}</h3>
                                        </div>
                                    </div>
                                    {discount && <div className="flex justify-between items-center pb-1">
                                        <div>
                                            <h3 className="md:text-lg font-semibold">{`Discount (${discount.percentage}%)`}</h3>
                                            <p className="text-xs">{discount.coupon}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold md:text-xl">{((discount.percentage / 100) * plans[plan].price) + " " + plans[plan].currency}</h3>
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
                                <div className="mb-5 flex items-center justify-center">
                                    <button className="bg-white/40 hover:bg-white/70 px-7 py-3 rounded-l-xl duration-300 active:scale-90 font-bold" onClick={() => updatePlan("remove")} type="button">Decrease</button>
                                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-3 rounded-r-xl duration-300 active:scale-90 font-bold" onClick={() => updatePlan("add")} type="button">Increase</button>
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
                                <button disabled={confirmLoader} className="w-full bg-purple-600 hover:bg-purple-800 p-3 text-white rounded-lg text-base md:text-lg font-bold duration-200 active:scale-95 flex items-center justify-center" type="submit">{confirmLoader ? "Please wait..." : `Submit (${payable} Tk/${(payable / currency.rate).toFixed(0)} USD)`}</button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <FeaturesComponent />
                    </div>
                </form>
            </div >
        </>
    );
}