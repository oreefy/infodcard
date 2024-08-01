import Layout from '@/components/account'
import Seo from '@/components/seo';
import Fetch from '@/fetch';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Earning() {
    const [loader, setLoader] = useState<boolean>(true);
    const [coupon, setCoupon] = useState<string>("");
    const [percentence, setPercentence] = useState<number>(0);
    const [share, setShare] = useState<number>(0);
    const [profit, setProfit] = useState<number>(0);
    const [couponLoader, setCouponLoader] = useState<boolean>(false);
    const [earning, setEarning] = useState<{ total: number; orders: number; upgrade: number; withdraws: number; pending: number }>({ total: 0, orders: 0, upgrade: 0, withdraws: 0, pending: 0 });
    const [history, setHistory] = useState<"earning" | "withdraw" | "withdraw-history" | "purchase" | "">("");
    const [earnings, setEarnings] = useState<{ amount: number; couponName: string | null; couponPercentage: number; couponPartner: number; couponClient: number; updatedAt: Date; }[]>([]);
    const [withdraws, setWithdraws] = useState<{ updatedAt: Date; createdAt: Date; amount: number; status: "Pending" | "Approved" | "Rejected"; method: string; account: string; message: string | null }[]>([]);
    const [withdrawRequestLoader, setWithdrawRequestLoader] = useState<boolean>(false);
    const LoadData = async () => {
        setLoader(true);
        const res = await Fetch("/api/account/earning", { method: "POST" });
        if (res.status === 200) {            
            setEarning(res.body.earning);
            setCoupon(res.body.coupon.code);
            setShare(res.body.coupon.client);
            setProfit(res.body.coupon.partner);
            setPercentence(res.body.coupon.percentage);
            setEarnings(res.body.history.earning);
            setWithdraws(res.body.history.withdrawns);
            setLoader(false);
        } else {
            toast.error(res.body.message || "Something went wrong.")
        }
    }
    useEffect(() => { LoadData() }, []);
    const shareOnChange = (event: any) => {
        setShare(event.target.value);
        setProfit(percentence - event.target.value);
    }
    const profitOnChange = (event: any) => {
        setProfit(event.target.value);
        setShare(percentence - event.target.value);
    }
    const updateCoupon = async (event: any) => {
        event.preventDefault();
        setCouponLoader(true);
        const res = await Fetch("/api/account/earning/update", {
            method: "POST",
            body: {
                client: +share,
                partner: +profit,
                code: coupon,
            }
        })
        if (res.status === 200) {
            setCoupon(res.body.coupon.code);
            setPercentence(res.body.coupon.percentage);
            setShare(res.body.coupon.client)
            setProfit(res.body.coupon.partner)
            toast.success("The coupon details has been successfully updated.");
            setCouponLoader(false);
        } else if (res.status === 409) {
            toast.error("The coupon name already exists.")
            setCouponLoader(false);
        } else {
            toast.error(res.body.message || "Something went wrong.");
            setCouponLoader(false);
        }
    }
    const withdrawRequest = async (event: any) => {
        event.preventDefault();
        setWithdrawRequestLoader(true);
        const data = {
            method: event.target.method.value || "",
            number: event.target.number.value || "",
            tk: event.target.tk.value || "",
            message: event.target.message.value || "",
        }
        if (earning.total >= data.tk) {
            const res = await Fetch("/api/account/earning/create-withdraw", { method: "POST", body: data })
            if (res.status === 200) {
                event.target.reset();
                LoadData()
                setWithdrawRequestLoader(false);
                toast.success("The withdrawal request has been successfully submitted.");
            } else {
                toast.error(res.body.message || "The withdrawal request has been successfully submitted.");
                setWithdrawRequestLoader(false);
            }
        } else {
            toast.error("You don't have Insufficient fund.");
            setWithdrawRequestLoader(false);
        }
    }
    return (
        <>
            <Seo title='Earning' />
            <Layout>
                {loader && <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    <span className="lg:col-span-2 w-full h-20 inline-block bg-white/50 animate-pulse rounded-lg"></span>
                    <span className="w-full h-96 inline-block bg-white/50 animate-pulse rounded-lg"></span>
                    <span className="w-full h-96 inline-block bg-white/50 animate-pulse rounded-lg"></span>
                </div>}
                {!loader && <div className='box flex justify-between items-center gap-3 mb-3'>
                    <h1 className='text-lg md:text-xl font-bold'>Earning Dashboard</h1>
                    <button onClick={() => LoadData()} disabled={loader} className='bg-white/50 hover:bg-white duration-200 px-3 py-1.5 rounded-lg active:scale-90 disabled:text-slate-300 disabled:bg-slate-500 disabled:active:scale-100' type='button'>Refresh</button>
                </div>}
                {!loader && <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className='box mb-0'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3'>
                            <div className='box mb-0'>
                                <h2 className='text-lg text-slate-600 font-semibold'>Balance Tk.</h2>
                                <p className='text-5xl text-purple-600 font-bold'>{earning.total}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className='box mb-0'>
                                    <h2 className='text-md leading-5 text-slate-600 font-semibold'>Earning</h2>
                                    <p className='text-2xl text-slate-600 font-bold'>{(earning.orders + earning.upgrade)}</p>
                                </div>
                                <div className='box mb-0'>
                                    <h2 className='text-md leading-5 text-slate-600 font-semibold'>Withdraw</h2>
                                    <p className='text-2xl text-slate-600 font-bold'>{earning.withdraws}</p>
                                    {earning.pending ? <p className='text-xs text-slate-600 font-bold'>{"+" + earning.pending + " Pending"}</p> : ""}
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-3'>
                            <div className='rounded-xl overflow-hidden bg-white/40'>
                                <button onClick={() => setHistory(history === "earning" ? "" : "earning")} className='w-full h-12 flex items-center justify-between bg-white/70 hover:bg-white duration-200 px-4 py-1 font-bold text-slate-600' type='button'>
                                    <span>Earning History</span>
                                    {history === "earning" ? <i className='bi bi-chevron-up'></i> : <i className='bi bi-chevron-down'></i>}
                                </button>
                                {history === "earning" && <div className='p-3'>
                                    <table className="w-full table table-auto">
                                        <thead>
                                            <tr>
                                                <th className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">Date</th>
                                                <th className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">Coupon</th>
                                                <th className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {earnings?.map((earning, index) => {
                                                return (<tr className="hover:bg-white/50 duration-200" key={index}>
                                                    <td className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">{`${new Date(earning.updatedAt).getDate()}/${new Date(earning.updatedAt).getMonth()}/${new Date(earning.updatedAt).getFullYear()}`}</td>
                                                    <td className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">{earning.couponName}</td>
                                                    <td className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">{((earning.couponPartner / 100) * (earning.amount - ((earning.couponClient / 100) * earning.amount))).toFixed(0)}</td>
                                                </tr>
                                                )
                                            })}
                                            {!earnings.length && <tr className="hover:bg-white/50 duration-200">
                                                <td colSpan={3} className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">No Transaction Found.</td>
                                            </tr>}
                                        </tbody>
                                    </table>
                                </div>}
                            </div>
                            <div className='rounded-xl overflow-hidden bg-white/40'>
                                <button onClick={() => setHistory(history === "withdraw" ? "" : "withdraw")} className='w-full h-12 flex items-center justify-between bg-white/70 hover:bg-white duration-200 px-4 py-1 font-bold text-slate-600' type='button'>
                                    <span>Withdraw</span>
                                    {history === "withdraw" ? <i className='bi bi-chevron-up'></i> : <i className='bi bi-chevron-down'></i>}
                                </button>
                                {history === "withdraw" && <div className='p-3'>
                                    <form className='grid grid-cols-1 gap-3 lg:px-4' onSubmit={withdrawRequest}>
                                        <div>
                                            <select className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600" name='method' title='Payment Options' required>
                                                <option value="bKash (Personal)">bKash (Personal)</option>
                                                <option value="Nagad (Personal)">Nagad (Personal)</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                        <div>
                                            <input min={1} max={50} maxLength={50} className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600" type="text" name="number" placeholder="Account Number" title='Account Number' required />
                                        </div>
                                        <div>
                                            <input min={2000} max={10000} maxLength={10000} className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600" type="number" name="tk" placeholder="Minimum 2,000 Tk" title='Taka' required />
                                        </div>
                                        <div>
                                            <textarea maxLength={200} className="w-full h-24 resize-none bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600" title='Message' name="message" placeholder='Message (Optional)'></textarea>
                                        </div>
                                        <div className="text-center -mt-2">
                                            <button disabled={withdrawRequestLoader} className="px-10 py-2 rounded-lg font-bold text-white bg-green-600 hover:bg-green-800 duration-200 active:scale-90 disabled:bg-green-900" type="submit">{withdrawRequestLoader ? "Please Wait..." : "Submit"}</button>
                                        </div>
                                    </form>
                                </div>}
                            </div>
                            <div className='rounded-xl overflow-hidden bg-white/40'>
                                <button onClick={() => setHistory(history === "withdraw-history" ? "" : "withdraw-history")} className='w-full h-12 flex items-center justify-between bg-white/70 hover:bg-white duration-200 px-4 py-1 font-bold text-slate-600' type='button'>
                                    <span>Withdraw History</span>
                                    {history === "withdraw-history" ? <i className='bi bi-chevron-up'></i> : <i className='bi bi-chevron-down'></i>}
                                </button>
                                {history === "withdraw-history" && <div className='p-3'>
                                    <table className="w-full table table-auto">
                                        <thead>
                                            <tr>
                                                <th className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">Date</th>
                                                <th className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">Status</th>
                                                <th className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">Account</th>
                                                <th className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {withdraws?.map((withdraw, index) => {
                                                return (<tr className="hover:bg-white/50 duration-200" key={index}>
                                                    <td className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">{`${new Date(withdraw.updatedAt).getDate()}/${new Date(withdraw.updatedAt).getMonth()}/${new Date(withdraw.updatedAt).getFullYear()}`}</td>
                                                    <td className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">{withdraw.status}</td>
                                                    <td className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">{withdraw.account}</td>
                                                    <td className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">{withdraw.amount}</td>
                                                </tr>
                                                )
                                            })}
                                            {!withdraws?.length && <tr className="hover:bg-white/50 duration-200">
                                                <td colSpan={4} className="text-xs md:text-base px-1 py-1 border border-slate-400 text-center">No Transaction Found.</td>
                                            </tr>}
                                        </tbody>
                                    </table>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <form className='box mb-0' onSubmit={updateCoupon}>
                            <h2 className='text-lg font-semibold mb-1'>Total Commission {percentence}%</h2>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-3 mb-1'>
                                <label>
                                    <span className='text-xs px-3 mb-1 inline-block'>My Profit %</span>
                                    <input disabled={couponLoader} min={0} max={percentence} value={profit} onChange={profitOnChange} className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600" type="number" name="profit" placeholder="0-100" required />
                                </label>
                                <label>
                                    <span className='text-xs px-3 mb-1 inline-block'>Customer Discount %</span>
                                    <input disabled={couponLoader} min={0} max={percentence} value={share} onChange={shareOnChange} className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600" type="number" name="share" placeholder="0-100" required />
                                </label>
                            </div>
                            <label className='block mb-3'>
                                <span className='text-xs px-3 mb-1 inline-block'>Coupon Code (a-z, A-Z, 0-9)</span>
                                <input disabled={couponLoader} pattern='^[a-zA-Z0-9]+$' maxLength={20} value={coupon} onChange={(e: any) => setCoupon(e.target.value || "")} className="w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600" type="text" name="coupon" placeholder="a-z, A-Z, 0-9" required />
                            </label>
                            <div className='px-3'>
                                <button disabled={couponLoader} className="w-full bg-green-600 hover:bg-green-800 px-6 py-2 flex items-center justify-center rounded-lg duration-200 active:scale-95 text-white" type="submit">{couponLoader ? "Please wait..." : "Update"}</button>
                            </div>
                        </form>
                    </div>
                </div>}
            </Layout>
        </>

    );
}