import Fetch from "@/fetch";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import database from "@/database";

export default function SocialMedia({ plan, profile }: { plan: "FREE" | "PREMIUM" | "BUSINESS"; profile: any }) {
    const db = database.planFeatures;
    const [socialsMedia, setSocialsMedia] = useState<any[]>(profile.socials || []);
    const [value, setValue] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);
    const [delLoader, setDelLoader] = useState<boolean>(false);
    const add = () => {
        setLoader(true);
        if (url) {
            const social = db.socials.find((media) => media.title === value);
            if (social) {
                const data = {
                    profile: profile.link,
                    title: social.title,
                    link: social.title === "WhatsApp" ? ("https://wa.me/" + url) : url,
                    type: social.type,
                    logo: social.logo,
                }
                Fetch("/api/account/socials/create", { method: "POST", body: { data } }).then((res) => {
                    if (res.status === 200) {
                        setSocialsMedia([...socialsMedia, res.body.socials]);
                        setValue("");
                        setUrl("")
                        toast.success(res.body.message || "Something went wrong");
                    } else {
                        toast.error(res.body.message || "Something went wrong");
                    }
                    setLoader(false);
                });
            } else {
                toast.info("Select the Social Media");
                setLoader(false);
            }
        } else {
            toast.info("Please fill in the URL field");
            setLoader(false);
        }
    }
    const remove = (unique: string) => {
        setDelLoader(true);
        Fetch("/api/account/socials/delete", { method: "POST", body: { unique, link: profile.link } }).then((res) => {
            if (res.status === 200) {
                const newSocialsMedia: any = [];
                socialsMedia.map((data) => { if (data.unique !== unique) { newSocialsMedia.push(data) } });
                setSocialsMedia(newSocialsMedia);
                toast.success(res.body.message || "Something went wrong");
            } else {
                toast.error(res.body.message || "Something went wrong");
            }
            setDelLoader(false);
        });
    }
    const disabledOption = (social: any): boolean => {
        let blocked = false;
        blocked = social.plan[plan] ? false : true;
        const find = socialsMedia.find((data: any) => data.title === social.title);
        blocked = find ? true : blocked;
        return blocked;
    }
    return (
        <>
            <div className="box p-0 m-0 overflow-hidden">
                <h3 className="box m-0 rounded-none font-bold">Socials Media</h3>
                <div className="p-3 md:p-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="box flex flex-wrap gap-3 m-0">
                        {!socialsMedia.length ? <p>No social media has been added yet.</p> : ""}
                        {socialsMedia?.map((data, index) => {
                            return data.link ? <div key={index}>
                                <div className="box px-3 py-2 flex gap-2 mb-0">
                                    <Link href={data.link} title={data.title} className="link" target="_blank">
                                        {data.type ? data.logo ? <i className={`${data.logo} mr-1.5`}></i> : <i className="bi bi-circle mr-1.5"></i> : data.logo ? <Image className="w-5 h-7 object-cover object-center rounded-full active:scale-75 mr-1.5" width={50} height={50} src={data.logo} alt={data.title} /> : <i className="bi bi-circle mr-1.5"></i>}{data.title}
                                    </Link>
                                    <button disabled={delLoader} onClick={() => remove(data.unique)} className="link active:scale-50 duration-200" type="button" title="Remove"><i className="bi bi-trash"></i></button>
                                </div>
                            </div> : ""
                        })}
                    </div>
                    <div className="grid grid-cols-1 gap-2 items-center">
                        <div>
                            <select value={value} onChange={(event) => setValue(event.target.value)} className="inp-text" title="Select Social Media">
                                <option value="">Select Social Media</option>
                                {db.socials.map((social, index) => { return <option key={index} disabled={disabledOption(social)} value={social.title}>{social.title}{social.plan[plan] ? "" : " (Upgrade)"}</option> })}
                            </select>
                        </div>
                        <div>
                            <input value={url} onChange={(event) => setUrl(event.target.value)} className="inp-text" type="text" placeholder="URL Here" />
                        </div>
                        <div>
                            {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full inline-block">Wait...</span> : <button onClick={add} className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="button">Add</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}