import Fetch from "@/fetch";
import { useState } from "react";

export default function Update({ profile }: { profile: any }) {
    const [loader, setLoader] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ type: string, success: boolean, message: string }[]>();
    const [data, setData] = useState<any>(profile)
    const [website] = useState<any>(profile.socials.find((social: any) => { return social.title === "Website" }))
    const [facebook, setFacebook] = useState<any>(profile.socials.find((social: any) => { return social.title === "Facebook" }))
    const [whatsApp, setWhatsApp] = useState<any>(profile.socials.find((social: any) => { return social.title === "WhatsApp" }))
    const updateProfile = (event: any) => {
        event.preventDefault();
        setErrors([])
        setLoader(true)
        const input: any = {
            link: profile.link,
            name: event.target.fullname.value || "",
            phone: event.target.phone.value || "",
            bio: event.target.bio.value || "",
            profession: event.target.profession.value || "",
            company: event.target.company.value || "",
            email: event.target.email.value || "",
            website: event.target.website.value || "",
            address: event.target.address.value || "",
            socials: {
                update: [
                    { where: { unique: website.unique }, data: { title: "Website", link: event.target.website.value || "", type: true, logo: "bi bi-globe" } },
                    { where: { unique: facebook.unique }, data: { title: "Facebook", link: event.target.facebook.value || "", type: true, logo: "bi bi-facebook" } },
                    { where: { unique: whatsApp.unique }, data: { title: "WhatsApp", link: `https://wa.me/${event.target.whatsapp.value ? event.target.whatsapp.value.includes("+") ? event.target.whatsapp.value : "+" + event.target.whatsapp.value : ""}`, type: true, logo: "bi bi-whatsapp" } }
                ]
            }
        }
        Fetch("/api/account/profile/free/update", { method: "POST", body: input }).then((res) => {
            if (res.status === 200) {
                setErrors([])
            } else {
                setErrors(res.body.errors)
            }
            setLoader(false)
        })
    }
    return (
        <form onSubmit={updateProfile} className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
                <label className="inp-label" htmlFor="fullname"><i className="bi bi-star-fill text-red-600"></i> Full Name</label>
                <input onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} maxLength={50} className="inp-text" type="text" name="fullname" id="fullname" placeholder="Enter Your Name" />
                {errors && errors.map((error, index) => { return error.type === "fullname" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div className="col-span-2">
                <label className="inp-label" htmlFor="phone"><i className="bi bi-star-fill text-red-600"></i> Phone Number</label>
                <input onChange={(e) => setData({ ...data, phone: e.target.value })} value={data.phone} className="inp-text" type="tel" pattern="([0-9 +]){6,14}" name="phone" placeholder="Enter Your Phone Number" id="name" required />
                {errors && errors.map((error, index) => { return error.type === "phone" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div className="col-span-2">
                <label className="inp-label" htmlFor="bio">Bio</label>
                <input onChange={(e) => setData({ ...data, bio: e.target.value })} value={data.bio} maxLength={250} className="inp-text" type="text" name="bio" id="bio" placeholder="Enter Your Bio (Optional)" />
                {errors && errors.map((error, index) => { return error.type === "bio" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div className="col-span-2">
                <label className="inp-label" htmlFor="profession">Profession</label>
                <input onChange={(e) => setData({ ...data, profession: e.target.value })} value={data.profession} maxLength={40} className="inp-text" type="text" name="profession" id="profession" placeholder="Enter Your Profession (Optional)" />
                {errors && errors.map((error, index) => { return error.type === "profession" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div className="col-span-2">
                <label className="inp-label" htmlFor="company">Company</label>
                <input onChange={(e) => setData({ ...data, company: e.target.value })} value={data.company} maxLength={70} className="inp-text" type="text" name="company" id="company" placeholder="Enter Your Company (Optional)" />
                {errors && errors.map((error, index) => { return error.type === "company" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div className="col-span-2">
                <label className="inp-label" htmlFor="email">Email</label>
                <input onChange={(e) => setData({ ...data, email: e.target.value })} value={data.email} maxLength={70} className="inp-text" type="text" name="email" id="email" placeholder="Enter Your Email (Optional)" />
                {errors && errors.map((error, index) => { return error.type === "email" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div className="col-span-2">
                <label className="inp-label" htmlFor="facebook">Facebook</label>
                <input onChange={(e) => setFacebook({ ...facebook, link: e.target.value })} value={facebook?.link || ""} maxLength={70} className="inp-text" type="text" name="facebook" id="facebook" placeholder="Facebook URL (Optional)" />
            </div>
            <div className="col-span-2">
                <label className="inp-label" htmlFor="whatsapp">{`WhatsApp (With Country Code)`}</label>
                <input onChange={(e) => setWhatsApp({ ...whatsApp, link: e.target.value })} value={whatsApp?.link ? whatsApp.link.replace("https://wa.me/", "") : ""} maxLength={70} className="inp-text mt-2" type="tel" pattern="([0-9 +]){6,14}" name="whatsapp" id="whatsapp" placeholder="WhatsApp +8801XXXXXXXXX" />
            </div>
            <div className="col-span-2">
                <label className="inp-label" htmlFor="website">Website</label>
                <input onChange={(e) => setData({ ...data, website: e.target.value })} value={data.website} maxLength={80} className="inp-text" type="text" name="website" id="website" placeholder="Enter Your Website (Optional)" />
                {errors && errors.map((error, index) => { return error.type === "website" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div className="col-span-2">
                <label className="inp-label" htmlFor="address">Address</label>
                <textarea onChange={(e) => setData({ ...data, address: e.target.value })} value={data.address} maxLength={250} className="inp-text resize-none" name="address" id="address" placeholder="Enter Your Address (Optional)" />
                {errors && errors.map((error, index) => { return error.type === "website" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </div>
            <div className="text-center col-span-2">
                {errors && errors.map((error, index) => { return error.type === "other" ? error.success ? <p className="mb-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mb-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Update</button>}
            </div>
        </form>
    );
}