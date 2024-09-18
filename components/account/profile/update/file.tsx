import Fetch from "@/fetch";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function File({ plan, profile }: { plan: "FREE" | "PREMIUM" | "BUSINESS"; profile: any }) {
    const [loader, setLoader] = useState<boolean>(false);
    const uploadcover = async (event: any) => {
        event.preventDefault();
        setLoader(true);
        const data = new FormData();
        for (let i = 0; i < event.target.cover.files.length; i++) {
            data.append("cover", event.target.cover.files[i]);
        }
        const res = await Fetch("/api/account/profile/update", {
            method: "POST",
            formData: data,
        });
        if (res.status === 200) {
            toast.success(res.body.message || "Something went wrong.");
        } else {
            toast.error(res.body.message || "Something went wrong.");
        }
        setLoader(false);
    }
    return (
        <>
            <form className="grid grid-cols-1 gap-3" onSubmit={uploadcover}>
                <input className="inp-text" type="file" multiple={true} accept="image/png, image/jpeg" name="cover" placeholder="Cover Photo" required />
                {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full inline-block">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Update</button>}
            </form>
            <div className="box mb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Image className="inline-block w-full h-52 md:h-80 rounded-md object-cover object-center" src={profile.cover} width={600} height={200} alt="..." />
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Image className="inline-block w-32 h-32 md:w-52 md:h-52" src={profile.avatar} width={200} height={200} alt="..." />
                    </div>
                    <div>
                        FN
                    </div>
                </div>
            </div>
        </>
    );
}