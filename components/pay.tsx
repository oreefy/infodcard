import { useState } from "react";

export default function Pay({ status }: { status: any }) {
    const [cancel, setCancel] = useState<boolean>(false);
    const [group, setGroup] = useState<string>("group");
    const [currency, setCurrency] = useState<string>("BDT");
    const [methods, setMethods] = useState<any>({
        usd: [{ title: "BKash" }, { title: "Nagad" }],
        bdt: [{ title: "Payonner" }, { title: "Card" }],
    });
    const paymentPreview = (method: any) => {
        switch (method) {
            case "bkash":
                return <>
                    <p>B-Kash Payment Method Play</p>
                </>
                break;
            case "nagad":
                return <>
                    <p>Nagad api Payment Play</p>
                </>
                break;

            default:
                return <>
                    <p>
                        Comming Soooon
                    </p></>
                break;
        }
    }
    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/80 backdrop-blur z-50 flex justify-center items-center overflow-hidden">
                <div className="md:container rounded-none md:rounded-2xl md:max-w-sm w-full h-screen md:h-fit md:max-h-[80%] box mb-0 overflow-x-hidden overflow-y-auto scroll duration-200">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold">Payment</h2>
                    </div>
                    <div className="py-5">
                        {
                            group === "group" ? <><div className="text-center">
                                <button className={`px-5 py-2 ${currency === "USD" ? "bg-white/80 hover:bg-white" : "bg-white/30 hover:bg-white/80"} duration-200 font-bold rounded-xl m-1`} type="button" onClick={() => currency === "BDT" && setCurrency("USD")}>USD</button>
                                <button className={`px-5 py-2 ${currency === "BDT" ? "bg-white/80 hover:bg-white" : "bg-white/30 hover:bg-white/80"} duration-200 font-bold rounded-xl m-1`} type="button" onClick={() => currency === "USD" && setCurrency("BDT")}>BDT</button>
                            </div>
                                <div className={`bg-white/30 rounded-3xl p-4 mt-5`}>
                                    <div className="bg-white/30 p-5 mb-5 rounded-xl">
                                        <p>Amount 500Tk</p>
                                        <p>Delivery 120 Tk</p>
                                        <p>Total 620 Tk</p>
                                        <p className="mt-5">Disount 100 Tk</p>
                                        <p>Total 520 Tk</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {
                                            currency === "BDT" && <><button type="button" onClick={() => setGroup("bkash")} className="box hover:bg-white/80 duration-200 mb-0 rounded-xl">
                                                <p>B-Kash</p>
                                            </button>
                                                <button type="button" onClick={() => setGroup("nagad")} className="box hover:bg-white/80 duration-200 mb-0 rounded-xl">
                                                    <p>Nagad</p>
                                                </button>
                                                <button type="button" onClick={() => setGroup("SEBL Web")} className="box hover:bg-white/80 duration-200 mb-0 rounded-xl">
                                                    <p>SEBL Web</p>
                                                </button>
                                                <button type="button" onClick={() => setGroup("City Pay")} className="box hover:bg-white/80 duration-200 mb-0 rounded-xl">
                                                    <p>City Pay</p>
                                                </button>
                                                <button type="button" onClick={() => setGroup("Cash on Delivery")} className="box hover:bg-white/80 duration-200 col-span-2 mb-0 rounded-xl">
                                                    <p>Cash on Delivery</p>
                                                </button></>
                                        }
                                        {
                                            currency === "USD" && <><button type="button" onClick={() => setGroup("Payonner")} className="box hover:bg-white/80 duration-200 mb-0 rounded-xl">
                                                <p>Payonner</p>
                                            </button>
                                                <button type="button" onClick={() => setGroup("Skrill")} className="box hover:bg-white/80 duration-200 mb-0 rounded-xl">
                                                    <p>Skrill</p>
                                                </button>
                                                <button type="button" onClick={() => setGroup("Card Pay")} className="box hover:bg-white/80 duration-200 mb-0 rounded-xl">
                                                    <p>Card Pay</p>
                                                </button>
                                                <button type="button" onClick={() => setGroup("WebMoney")} className="box hover:bg-white/80 duration-200 mb-0 rounded-xl">
                                                    <p>WebMoney</p>
                                                </button>
                                                <button type="button" onClick={() => setGroup("Cash on Delivery")} className="box hover:bg-white/80 duration-200 col-span-2 mb-0 rounded-xl">
                                                    <p>Cash on Delivery</p>
                                                </button></>
                                        }

                                    </div>
                                </div></> : <>
                                <button className="bg-white/50 p-3 rounded-xl" type="button" onClick={() => setGroup("group")}>Back</button>
                                {paymentPreview(group)}
                            </>
                        }

                    </div>
                    <div className="text-center">
                        {cancel ? <><button className="text-center inline-block text-red-800 font-bold bg-red-200/20 hover:bg-red-200/40 duration-200 px-3 py-1 rounded-xl mr-1" onClick={() => status(false)}>Confirm Cancel</button><button className="text-center inline-block text-slate-800 font-bold hover:bg-slate-200/30 duration-200 px-3 py-1 rounded-xl" onClick={() => setCancel(false)}>Continue</button></> : <button className="text-center inline-block text-red-800 font-bold hover:bg-red-200/30 duration-200 px-3 py-1 rounded-xl" onClick={() => setCancel(true)}>Cancel Payment</button>}
                    </div>
                </div>
            </div>
        </>
    );
}