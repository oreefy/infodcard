import Fetch from "@/fetch";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Create({ link }: { link: string }) {
    const router = useRouter()
    const [errors, setErrors] = useState<{ type: string; success: boolean; message: string }[]>([])
    const [loader, setLoader] = useState<boolean>(false)

    const createGlobalBank = (event: any) => {
        event.preventDefault();
        setLoader(true)
        const reset = () => {
            event.target.bank.value = ""
            event.target.lineOne.value = ""
            event.target.lineTwo.value = ""
            event.target.lineThree.value = ""
        }
        const input: any = {
            link: link,
            bank: event.target.bank.value || "",
            lineOne: event.target.lineOne.value || "",
            lineTwo: event.target.lineTwo.value || "",
            lineThree: event.target.lineThree.value || "",
        }
        Fetch("/api/account/global-bank/create", {
            method: "POST",
            body: input
        }).then((res) => {
            if (res.status === 200) {
                setErrors(res.body.errors)
                setLoader(false)
                reset()
                router.push("/my-account/profile/global-bank")
            } else {
                setErrors(res.body.errors)
                setLoader(false)
            }
        })
    }
    return (
        <form onSubmit={createGlobalBank} className="box grid grid-cols-1 gap-2 mb-0">
            <div>
                <label className="inp-label" htmlFor="bank"><i className="bi bi-star-fill text-red-600"></i> Bank Name</label>
                <input maxLength={100} className="inp-text" type="text" name="bank" placeholder="Enter Your Bank Name" id="bank" required />
                {errors && errors.map((error, index) => { return error.type === "bank" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div>
                <label className="inp-label" htmlFor="lineOne"><i className="bi bi-star-fill text-red-600"></i> Line One</label>
                <input maxLength={70} className="inp-text" type="text" name="lineOne" placeholder="Enter Line One" id="lineOne" required />
                {errors && errors.map((error, index) => { return error.type === "lineOne" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div>
                <label className="inp-label" htmlFor="lineTwo">Line Two</label>
                <input maxLength={70} className="inp-text" type="text" name="lineTwo" placeholder="Enter Line Two" id="lineTwo" />
                {errors && errors.map((error, index) => { return error.type === "lineTwo" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div>
                <label className="inp-label" htmlFor="lineThree">Line Three</label>
                <input maxLength={70} className="inp-text" type="text" name="lineThree" placeholder="Enter Line Three" id="lineThree" />
                {errors && errors.map((error, index) => { return error.type === "lineThree" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div className="text-center mt-3">
                {errors && errors.map((error, index) => { return error.type === "other" ? error.success ? <p className="mb-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mb-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Create</button>}
            </div>
        </form>
    );
}