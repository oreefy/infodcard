import Fetch from "@/fetch";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Create({ link }: { link: string }) {
    const router = useRouter()
    const [errors, setErrors] = useState<{ type: string; success: boolean; message: string }[]>([])
    const [loader, setLoader] = useState<boolean>(false)

    const createMobileBank = (event: any) => {
        event.preventDefault();
        setErrors([])
        setLoader(true)
        const reset = () => {
            event.target.name.value = ""
            event.target.type.value = ""
            event.target.number.value = ""
        }
        const input: any = {
            link: link,
            name: event.target.name.value || "",
            number: event.target.number.value || "",
            type: event.target.type.value || "",
        }
        Fetch("/api/account/mobile-bank/create", { method: "POST", body: input }).then((res) => {
            if (res.status === 200) {
                setErrors(res.body.errors);
                reset()
                router.push("/my-account/profile/mobile-bank")
            } else {
                setErrors(res.body.errors)
                setLoader(false)
            }
            setLoader(false)
        })
    }
    return (
        <form onSubmit={createMobileBank}>
            <div>
                <label className="inp-label" htmlFor="name"><i className="bi bi-star-fill text-red-600"></i> Mobile Banking Name</label>
                <input maxLength={70} className="inp-text" type="text" name="name" placeholder="Mobile Banking Name" id="name" required />
                {errors && errors.map((error, index) => { return error.type === "name" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div>
                <label className="inp-label" htmlFor="number"><i className="bi bi-star-fill text-red-600"></i> Phone Number</label>
                <input className="inp-text" type="tel" pattern="([0-9 +]){6,14}" name="number" placeholder="Phone Number" id="number" required />
                {errors && errors.map((error, index) => { return error.type === "number" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div>
                <label className="inp-label" htmlFor="type">Account Type</label>
                <input maxLength={20} className="inp-text" type="text" name="type" id="type" placeholder="Personal / Agent / Merchant" />
                {errors && errors.map((error, index) => { return error.type === "type" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div className="text-center mt-3">
                {errors && errors.map((error, index) => { return error.type === "other" ? error.success ? <p className="mb-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mb-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Create</button>}
            </div>
        </form>
    );
}