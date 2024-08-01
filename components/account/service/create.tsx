import Fetch from "@/fetch";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Create({ link }: { link: string }) {
    const router = useRouter()
    const [errors, setErrors] = useState<{ type: string; success: boolean; message: string }[]>([])
    const [loader, setLoader] = useState<boolean>(false)

    const createService = (event: any) => {
        event.preventDefault();
        setErrors([])
        setLoader(true)
        const reset = () => {
            event.target.title.value = ""
            event.target.message.value = ""
            event.target.price.value = ""
        }
        const input: any = {
            link: link,
            title: event.target.title.value || "",
            message: event.target.message.value || "",
            price: event.target.price.value || "",
        }
        Fetch("/api/account/service/create", { method: "POST", body: input }).then((res) => {
            if (res.status === 200) {
                setErrors(res.body.errors)
                reset()
                router.push("/my-account/profile/service")
            } else {
                setErrors(res.body.errors)
            }
            setLoader(false)
        })
    }
    return (
        <form onSubmit={createService}>
            <div>
                <label className="inp-label" htmlFor="title"><i className="bi bi-star-fill text-red-600"></i> Service Title</label>
                <input maxLength={70} className="inp-text" type="text" name="title" placeholder="Service Title" id="title" required />
                {errors && errors.map((error, index) => { return error.type === "title" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div>
                <label className="inp-label" htmlFor="message">Description</label>
                <input maxLength={150} className="inp-text" type="text" name="message" id="message" placeholder="Service Description" />
                {errors && errors.map((error, index) => { return error.type === "message" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div>
                <label className="inp-label" htmlFor="price">Price / Button</label>
                <input maxLength={20} className="inp-text" type="text" name="price" id="price" placeholder="Service Price" />
                {errors && errors.map((error, index) => { return error.type === "price" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div className="text-center mt-3">
                {errors && errors.map((error, index) => { return error.type === "other" ? error.success ? <p className="mb-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mb-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Create</button>}
            </div>
        </form>
    );
}