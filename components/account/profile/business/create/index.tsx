import Fetch from "@/fetch";
import { useState } from "react";
import { Sanitizer } from "primepack/client";
import { useRouter } from 'next/router'

export default function CreateBusinessProfile() {
    const router = useRouter()
    const [errors, setErrors] = useState<{ type: string; success: boolean; message: string }[]>([])
    const [loader, setLoader] = useState<boolean>(false)
    const [link, setLink] = useState<string>("")
    const createProfile = (event: any) => {
        event.preventDefault();
        setErrors([])
        setLoader(true)
        const reset = () => {
            event.target.link.value = ""
            event.target.fullname.value = ""
            event.target.phone.value = ""
            event.target.bio.value = ""
            event.target.youtube.value = ""
            event.target.profession.value = ""
            event.target.company.value = ""
            event.target.designation.value = ""
            event.target.companyemail.value = ""
            event.target.companyphone.value = ""
            event.target.corporate.value = ""
            event.target.branch.value = ""
            event.target.email.value = ""
            event.target.website.value = ""
            event.target.address.value = ""
            event.target.whatsapp.value = ""
            event.target.facebook.value = ""
        }
        const input: any = {
            link: event.target.link.value || "",
            name: event.target.fullname.value || "",
            phone: event.target.phone.value || "",
            bio: event.target.bio.value || "",
            youtube: event.target.youtube.value || "",
            profession: event.target.profession.value || "",
            company: event.target.company.value || "",
            companyphone: event.target.companyphone.value || "",
            designation: event.target.designation.value || "",
            companyemail: event.target.companyemail.value || "",
            corporate: event.target.corporate.value || "",
            branch: event.target.branch.value || "",
            email: event.target.email.value || "",
            website: event.target.website.value || "",
            address: event.target.address.value || "",
            socials: [
                { title: "WhatsApp", link: event.target.whatsapp.value && `https://wa.me/${event.target.whatsapp.value ? event.target.whatsapp.value.includes("+") ? event.target.whatsapp.value : "+" + event.target.whatsapp.value : ""}`, type: true, logo: "bi bi-whatsapp" },
                { title: "Website", link: event.target.website.value || "", type: true, logo: "bi bi-globe" },
                { title: "Facebook", link: event.target.facebook.value || "", type: true, logo: "bi bi-facebook" },
                { title: "YouTube", link: event.target.socialYoutube.value || "", type: true, logo: "bi bi-youtube" },
                { title: "Map", link: event.target.map.value || "", type: true, logo: "bi bi-geo" },
                { title: "Twitter", link: event.target.twitter.value || "", type: true, logo: "bi bi-twitter" },
                { title: "Instagram", link: event.target.instagram.value || "", type: true, logo: "bi bi-instagram" },
                { title: "Linkedin", link: event.target.linkedin.value || "", type: true, logo: "bi bi-linkedin" },
                { title: "Pinterest", link: event.target.pinterest.value || "", type: true, logo: "bi bi-pinterest" },
                { title: "TikTok", link: event.target.tiktok.value || "", type: true, logo: "bi bi-tiktok" },
                { title: "Reddit", link: event.target.reddit.value || "", type: true, logo: "bi bi-reddit" },
                { title: "Snapchat", link: event.target.snapchat.value || "", type: true, logo: "bi bi-snapchat" },
                { title: "Freelancer", link: event.target.freelancer.value || "", type: true, logo: "bi bi-circle" },
                { title: "Fiverr", link: event.target.fiverr.value || "", type: true, logo: "bi bi-circle" },
                { title: "UpWork", link: event.target.upwork.value || "", type: true, logo: "bi bi-circle" },
                { title: "People Per Hour", link: event.target.peopleperhour.value || "", type: true, logo: "bi bi-circle" },
            ]
        }
        Fetch("/api/account/profile/business/create", { method: "POST", body: input }).then((res) => {
            if (res.status === 200) {
                setErrors([]);
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
            <form onSubmit={createProfile} className="grid grid-cols-1 gap-3">
                <div className="box p-0 mb-0">
                    <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                        <h3 className="text-center font-bold text-xl">Profile Info</h3>
                    </div>
                    <div className="p-3 grid grid-cols-1 gap-2">
                        <div>
                            <label className="inp-label" htmlFor="username">{link ? <span className="w-full inline-block break-words"><i className="bi bi-star-fill text-red-600"></i> Username -  infodcard.com/p/<span className="font-bold">{link}</span></span> : <span><i className="bi bi-star-fill text-red-600"></i> Username</span>}</label>
                            <input maxLength={32} onChange={checkLink} className="inp-text" type="text" name="link" placeholder="Enter Your Username" id="username" required />
                            {errors && errors.map((error, index) => { return error.type === "username" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="fullname"><i className="bi bi-star-fill text-red-600"></i> Full Name</label>
                            <input maxLength={50} className="inp-text" type="text" name="fullname" id="fullname" placeholder="Enter Your Name" />
                            {errors && errors.map((error, index) => { return error.type === "fullname" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="phone"><i className="bi bi-star-fill text-red-600"></i> Phone Number</label>
                            <input className="inp-text" type="tel" pattern="([0-9 +]){6,14}" name="phone" placeholder="Enter Your Phone Number" id="phone" required />
                            {errors && errors.map((error, index) => { return error.type === "phone" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="bio">Bio</label>
                            <input maxLength={250} className="inp-text" type="text" name="bio" id="bio" placeholder="Enter Your Bio (Optional)" />
                            {errors && errors.map((error, index) => { return error.type === "bio" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="youtube">YouTube Intro Video</label>
                            <input maxLength={250} className="inp-text" type="text" name="youtube" id="youtube" placeholder="Enter Your YouTube Intro Video (Optional)" />
                            {errors && errors.map((error, index) => { return error.type === "youtube" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                    </div>
                </div>
                <div className="box p-0 mb-0">
                    <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                        <h3 className="text-center font-bold text-xl ">Contact Info</h3>
                    </div>
                    <div className="p-3 grid grid-cols-1 gap-2">
                        <div>
                            <label className="inp-label" htmlFor="profession">Profession</label>
                            <input maxLength={40} className="inp-text" type="text" name="profession" id="profession" placeholder="Enter Your Profession (Optional)" />
                            {errors && errors.map((error, index) => { return error.type === "profession" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="email">Email</label>
                            <input maxLength={70} className="inp-text" type="text" name="email" id="email" placeholder="Enter Your Email (Optional)" />
                            {errors && errors.map((error, index) => { return error.type === "email" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="address">Address</label>
                            <textarea maxLength={250} className="inp-text resize-none" name="address" id="address" placeholder="Enter Your Address (Optional)" />
                            {errors && errors.map((error, index) => { return error.type === "website" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                    </div>
                </div>
                <div className="box p-0 mb-0">
                    <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                        <h3 className="text-center font-bold text-xl ">Company Info</h3>
                    </div>
                    <div className="p-3 grid grid-cols-1 gap-2">
                        <div>
                            <label className="inp-label" htmlFor="company">Company</label>
                            <input maxLength={70} className="inp-text" type="text" name="company" id="company" placeholder="Enter Your Company (Optional)" />
                            {errors && errors.map((error, index) => { return error.type === "company" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="designation">Designation</label>
                            <input maxLength={40} className="inp-text" type="text" name="designation" id="designation" placeholder="Enter Your Designation (Optional)" />
                            {errors && errors.map((error, index) => { return error.type === "designation" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="companyphone">Phone Number</label>
                            <input className="inp-text" type="tel" pattern="([0-9 +]){6,14}" name="companyphone" placeholder="Enter Your Phone Number" />
                            {errors && errors.map((error, index) => { return error.type === "companyphone" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="companyemail">Email</label>
                            <input maxLength={70} className="inp-text" type="text" name="companyemail" id="companyemail" placeholder="Enter Your Email (Optional)" />
                            {errors && errors.map((error, index) => { return error.type === "companyemail" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="website">Website</label>
                            <input maxLength={80} className="inp-text" type="text" name="website" id="website" placeholder="Enter Your Website (Optional)" />
                            {errors && errors.map((error, index) => { return error.type === "website" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="corporate">Office Address</label>
                            <textarea maxLength={250} className="inp-text resize-none" name="corporate" id="corporate" placeholder="Enter Your Corporate Address (Optional)" />
                            {errors && errors.map((error, index) => { return error.type === "corporate" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="branch">Branch Address</label>
                            <textarea maxLength={250} className="inp-text resize-none" name="branch" id="branch" placeholder="Enter Your Branch Address (Optional)" />
                            {errors && errors.map((error, index) => { return error.type === "branch" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                        </div>
                    </div>
                </div>
                <div className="box p-0 mb-0">
                    <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                        <h3 className="text-center font-bold text-xl ">Social Media</h3>
                    </div>
                    <div className="p-3 grid grid-cols-1 gap-2">
                        <div>
                            <label className="inp-label" htmlFor="whatsApp">{`WhatsApp (With Country Code)`}</label>
                            <input maxLength={70} className="inp-text mt-2" type="tel" pattern="([0-9 +]){6,14}" name="whatsapp" id="whatsApp" placeholder="WhatsApp +8801XXXXXXXXX" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="facebook">Facebook</label>
                            <input maxLength={70} className="inp-text" type="text" name="facebook" id="facebook" placeholder="Facebook URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="socialYoutube">YouTube Chanel</label>
                            <input maxLength={70} className="inp-text" type="text" name="socialYoutube" id="socialYoutube" placeholder="YouTube Chanel (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="map">Map</label>
                            <input maxLength={70} className="inp-text" type="text" name="map" id="map" placeholder="Map URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="twitter">Twitter</label>
                            <input maxLength={70} className="inp-text" type="text" name="twitter" id="twitter" placeholder="Twitter URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="instagram">Instagram</label>
                            <input maxLength={70} className="inp-text" type="text" name="instagram" id="instagram" placeholder="Lnstagram URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="linkedin">Linkedin</label>
                            <input maxLength={70} className="inp-text" type="text" name="linkedin" id="linkedin" placeholder="Linkedin URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="pinterest">Pinterest</label>
                            <input maxLength={70} className="inp-text" type="text" name="pinterest" id="pinterest" placeholder="Pinterest URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="tiktok">TikTok</label>
                            <input maxLength={70} className="inp-text" type="text" name="tiktok" id="tiktok" placeholder="Tiktok URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="reddit">Reddit</label>
                            <input maxLength={70} className="inp-text" type="text" name="reddit" id="reddit" placeholder="Reddit URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="snapchat">Snapchat</label>
                            <input maxLength={70} className="inp-text" type="text" name="snapchat" id="snapchat" placeholder="Snapchat URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="freelancer">Freelancer</label>
                            <input maxLength={70} className="inp-text" type="text" name="freelancer" id="freelancer" placeholder="Freelancer URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="fiverr">Fiverr</label>
                            <input maxLength={70} className="inp-text" type="text" name="fiverr" id="fiverr" placeholder="Fiverr URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="upwork">Upwork</label>
                            <input maxLength={70} className="inp-text" type="text" name="upwork" id="upwork" placeholder="Upwork URL (Optional)" />
                        </div>
                        <div>
                            <label className="inp-label" htmlFor="peopleperhour">People Per Hour</label>
                            <input maxLength={70} className="inp-text" type="text" name="peopleperhour" id="peopleperhour" placeholder="Peopleperhour URL (Optional)" />
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    {errors && errors.map((error, index) => { return error.type === "other" ? error.success ? <p className="mb-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mb-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                    {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Create</button>}
                </div>
            </form>
        </>
    );
}