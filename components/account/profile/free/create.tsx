import Fetch from "@/fetch";
import { useState } from "react";
import { Sanitizer } from "primepack/client"
import { useRouter } from 'next/router'

export default function CreateFreeProfile() {
    const router = useRouter()
    const [errors, setErrors] = useState<{ type: string; success: boolean; message: string }[]>([])
    const [loader, setLoader] = useState<boolean>(false)
    const [link, setLink] = useState<string>("")
    const createProfile = (event: any) => {
        event.preventDefault();
        setErrors([])
        setLoader(true)
        const reset = () => {
            event.target.reset();
        }
        const input: any = {
            link: event.target.link.value || "",
            name: event.target.fullname.value || "",
            phone: event.target.phone.value || "",
            bio: event.target.bio.value || "",
            profession: event.target.profession.value || "",
            company: event.target.company.value || "",
            email: event.target.email.value || "",
            website: event.target.website.value || "",
            address: event.target.address.value || "",
            socials: [
                { title: "Website", link: event.target.website.value || "", type: true, logo: "bi bi-globe" },
                { title: "Facebook", link: event.target.facebook.value || "", type: true, logo: "bi bi-facebook" },
                { title: "WhatsApp", link: event.target.whatsapp.value && `https://wa.me/${event.target.whatsapp.value ? event.target.whatsapp.value.includes("+") ? event.target.whatsapp.value : "+" + event.target.whatsapp.value : ""}`, type: true, logo: "bi bi-whatsapp" }
            ]
        }
        Fetch("/api/account/profile/free/create", { method: "POST", body: input }).then((res) => {
            if (res.status === 200) {
                setErrors([])
                reset()
                router.push("/p/" + input.link);
            } else {
                setErrors(res.body.errors)
            }
            setLoader(false)
        })
    }
    const checkLink = (event: any) => {
        setLink(Sanitizer.toPath(event.target.value));
        if (event.target.value.includes(" ")) {
            setErrors([{ type: "username", success: false, message: "Spaces or special characters are not allowed." }])
        } else {
            if (link) {
                Fetch("/api/account/check-profile", { method: "POST", body: { link: Sanitizer.toPath(event.target.value) } }).then((res) => {
                    if (res.status === 200) {
                        setErrors([])
                    } else {

                        setErrors(res.body.errors)
                    }
                })
            }
            setErrors([{ type: "username", success: false, message: "" }])
        }
    }
    return (
        <>
            <form onSubmit={createProfile} className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                    <label className="inp-label" htmlFor="username">{link ? <span className="w-full inline-block break-words"><i className="bi bi-star-fill text-red-600"></i> Username -  infodcard.com/p/<span className="font-bold">{link}</span></span> : <span><i className="bi bi-star-fill text-red-600"></i> Username</span>}</label>
                    <input maxLength={32} onChange={checkLink} className="inp-text" type="text" name="link" placeholder="Enter Your Username" id="username" required />
                    {errors && errors.map((error, index) => { return error.type === "username" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                </div>
                <div className="col-span-2">
                    <label className="inp-label" htmlFor="fullname"><i className="bi bi-star-fill text-red-600"></i> Full Name</label>
                    <input maxLength={50} className="inp-text" type="text" name="fullname" id="fullname" placeholder="Enter Your Name" />
                    {errors && errors.map((error, index) => { return error.type === "fullname" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                </div>
                <div className="col-span-2">
                    <label className="inp-label" htmlFor="phone"><i className="bi bi-star-fill text-red-600"></i> Phone Number</label>
                    <input className="inp-text" type="tel" pattern="([0-9 +]){6,14}" name="phone" placeholder="Enter Your Phone Number" id="phone" required />
                    {errors && errors.map((error, index) => { return error.type === "phone" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                </div>
                <div className="col-span-2">
                    <label className="inp-label" htmlFor="bio">Bio</label>
                    <input maxLength={250} className="inp-text" type="text" name="bio" id="bio" placeholder="Enter Your Bio (Optional)" />
                    {errors && errors.map((error, index) => { return error.type === "bio" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                </div>
                <div className="col-span-2">
                    <label className="inp-label" htmlFor="profession">Profession</label>
                    <input maxLength={40} className="inp-text" type="text" name="profession" id="profession" placeholder="Enter Your Profession (Optional)" />
                    {errors && errors.map((error, index) => { return error.type === "profession" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                </div>
                <div className="col-span-2">
                    <label className="inp-label" htmlFor="company">Company</label>
                    <input maxLength={70} className="inp-text" type="text" name="company" id="company" placeholder="Enter Your Company (Optional)" />
                    {errors && errors.map((error, index) => { return error.type === "company" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                </div>
                <div className="col-span-2">
                    <label className="inp-label" htmlFor="email">Email</label>
                    <input maxLength={70} className="inp-text" type="text" name="email" id="email" placeholder="Enter Your Email (Optional)" />
                    {errors && errors.map((error, index) => { return error.type === "email" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                </div>
                <div className="col-span-2">
                    <label className="inp-label" htmlFor="facebook">Facebook</label>
                    <input maxLength={70} className="inp-text" type="text" name="facebook" id="facebook" placeholder="Facebook URL (Optional)" />
                </div>
                <div className="col-span-2">
                    <label className="inp-label" htmlFor="whatsApp">{`WhatsApp (With Country Code)`}</label>
                    <input maxLength={70} className="inp-text mt-2" type="tel" pattern="([0-9 +]){6,14}" name="whatsapp" id="whatsApp" placeholder="WhatsApp +8801XXXXXXXXX" />
                </div>
                <div className="col-span-2">
                    <label className="inp-label" htmlFor="website">Website</label>
                    <input maxLength={80} className="inp-text" type="text" name="website" id="website" placeholder="Enter Your Website (Optional)" />
                    {errors && errors.map((error, index) => { return error.type === "website" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                </div>
                <div className="col-span-2">
                    <label className="inp-label" htmlFor="address">Address</label>
                    <textarea maxLength={250} className="inp-text resize-none" name="address" id="address" placeholder="Enter Your Address (Optional)" />
                    {errors && errors.map((error, index) => { return error.type === "website" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                </div>
                <div className="text-center col-span-2">
                    {errors && errors.map((error, index) => { return error.type === "other" ? error.success ? <p className="mb-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mb-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                    {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Create</button>}
                </div>
            </form>
        </>
    );
}