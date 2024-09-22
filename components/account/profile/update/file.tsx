import Fetch from "@/fetch";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function File({ plan, profile }: { plan: "FREE" | "PREMIUM" | "BUSINESS"; profile: any }) {
    const [loader, setLoader] = useState<"cover" | "avatar" | "">("");
    const [cover, setCover] = useState(profile.cover || "");
    const [avatar, setAvatar] = useState(profile.avatar || "");
    const [fileBtn, setFileBtn] = useState<"cover" | "avatar" | "">("");
    const update = (event: any, type: "cover" | "avatar") => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (type === "avatar") {
                    setFileBtn("avatar");
                    setAvatar(e.target.result);
                }
                if (type === "cover") {
                    setFileBtn("cover");
                    setCover(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    }
    const uploadcover = async (event: any, type: "cover" | "avatar") => {
        event.preventDefault();
        setLoader(type);
        const data = new FormData();
        data.append("plan", plan);
        data.append("link", profile.link);
        if (type === "cover") {
            data.append(type, event.target.cover.files[0]);
        }
        if (type === "avatar") {
            data.append(type, event.target.avatar.files[0]);
        }
        const res = await Fetch("/api/account/profile/file/" + type, {
            method: "POST",
            formData: data,
        });
        if (res.status === 200) {
            res.body.profile.cover && setCover(res.body.profile.cover);
            res.body.profile.avatar && setAvatar(res.body.profile.avatar);
            event.target.reset();
            toast.success(res.body.message || "Something went wrong.");
        } else {
            toast.error(res.body.message || "Something went wrong.");
        }
        setFileBtn("");
        setLoader("");
    }
    return (
        <>
            <div className="box p-0 m-0 overflow-hidden">
                <div>
                    <div className="flex w-full h-40 md:h-64 lg:h-72 xl:h-96">
                        <Image className="w-full h-full object-cover object-center" src={cover} width={600} height={500} alt="Cover Photo"></Image>
                    </div>
                    <div className="grid grid-cols-2 gap-3 p-3 items-center">
                        <div className="flex w-28 h-28 md:h-40 md:w-40 xl:w-52 xl:h-52 max-w-full">
                            <Image className="w-full h-full rounded-full outline outline-4 outline-white object-cover object-center" src={avatar} width={300} height={300} alt="Avatar"></Image>
                        </div>
                        <div>
                            <form className="flex flex-wrap gap-1 justify-end mb-2" onSubmit={(event) => uploadcover(event, "cover")}>
                                <label>
                                    <input onChange={(event) => update(event, "cover")} className="inp-text" type="file" hidden={true} accept="image/png, image/jpg, image/jpeg" name="cover" placeholder="Cover Photo" required />
                                    {!loader && <span className="py-1 px-2 cursor-pointer active:scale-75 duration-200 rounded-lg text-xs md:text-base border-2 border-purple-600 text-purple-800 inline-block">{fileBtn === "cover" ? "Change" : "Change Cover"}</span>}
                                </label>
                                {fileBtn === "cover" ? loader === "cover" ? <span className="py-1 px-2 cursor-pointer active:scale-75 duration-200 rounded-lg text-xs md:text-base border-2 border-blue-600 text-blue-600 inline-block">Wait...</span> : <button className="py-1 px-2 cursor-pointer active:scale-75 duration-200 rounded-lg text-xs md:text-base border-2 border-purple-600 text-purple-800 inline-block" type="submit" title="Update"><i className="bi bi-check-lg"></i></button> : null}
                            </form>
                            <form className="flex flex-wrap gap-1 justify-end" onSubmit={(event) => uploadcover(event, "avatar")}>
                                <label>
                                    <input onChange={(event) => update(event, "avatar")} className="inp-text" type="file" hidden={true} accept="image/png, image/jpg, image/jpeg" name="avatar" placeholder="Avatar" required />
                                    {!loader && <span className="py-1 px-2 cursor-pointer active:scale-75 duration-200 rounded-lg text-xs md:text-base border-2 border-green-600 text-green-700 inline-block">{fileBtn === "avatar" ? "Change" : "Change Avatar"}</span>}
                                </label>
                                {fileBtn === "avatar" ? loader === "avatar" ? <span className="py-1 px-2 cursor-pointer active:scale-75 duration-200 rounded-lg text-xs md:text-base border-2 border-blue-600 text-blue-600 inline-block">Wait...</span> : <button className="py-1 px-2 cursor-pointer active:scale-75 duration-200 rounded-lg text-xs md:text-base border-2 border-green-600 text-green-700 inline-block" type="submit" title="Avatar"><i className="bi bi-check-lg"></i></button> : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}