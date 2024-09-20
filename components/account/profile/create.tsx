import Fetch from "@/fetch";
import { useEffect, useState } from "react";
import { Sanitizer } from "primepack/client";
import { useRouter } from 'next/router';
import database from '@/database';
import Input from '@/components/account/profile/input';
import { useSession } from "next-auth/react";

export default function CreateProfile() {
    const DB = database.planFeatures
    const router = useRouter();
    const { data: session } = useSession();
    const [errors, setErrors] = useState<{ type: string; success: boolean; message: string }[]>([]);
    const [loader, setLoader] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");
    useEffect(() => {
        setLink(Sanitizer.toPath(link));
        if (link) {
            Fetch("/api/account/check-profile", { method: "POST", body: { link: Sanitizer.toPath(link) } }).then((res) => {
                if (res.status === 200) {
                    setErrors([])
                } else {
                    setErrors(res.body.errors);
                }
            })
        }
    }, [link]);
    const createProfile = (event: any) => {
        event.preventDefault();
        setErrors([])
        setLoader(true)
        const reset = () => {
            event.target.reset();
        }
        const input: any = {
            username: event.target?.username.value || "",
            name: event.target?.fullname.value || "",
            phone: event.target?.phone.value || "",
            bio: event.target?.bio.value || "",
            profession: event.target?.profession.value || "",
            address: event.target?.address.value || "",
        }
        Fetch("/api/account/profile/create", { method: "POST", body: input }).then((res) => {
            if (res.status === 200) {
                setErrors([])
                reset()
                router.push("/p/" + input.username);
            } else {
                setErrors(res.body.errors)
            }
            setLoader(false)
        })
    }
    return (
        <>
            <form onSubmit={createProfile} className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                    {link && <span className="w-full inline-block break-words">infodcard.com/p/<span className="font-bold">{link}</span></span>}
                    <Input onChange={setLink} plan={session?.user?.name as any} field={DB.profile.username} errors={errors} />
                </div>
                <div className="col-span-2">
                    <Input plan={session?.user?.name as any} field={DB.profile.fullname} errors={errors} />
                </div>
                <div className="col-span-2">
                    <Input plan={session?.user?.name as any} field={DB.profile.phone} errors={errors} />
                </div>
                <div className="col-span-2">
                    <Input plan={session?.user?.name as any} field={DB.profile.bio} errors={errors} />
                </div>
                <div className="col-span-2">
                    <Input plan={session?.user?.name as any} field={DB.contact.profession} errors={errors} />
                </div>
                <div className="col-span-2">
                    <Input plan={session?.user?.name as any} field={DB.contact.address} errors={errors} />
                </div>
                <div className="text-center col-span-2">
                    {errors && errors.map((error, index) => { return error.type === "other" ? error.success ? <p className="mb-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mb-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                    {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full inline-block">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Create</button>}
                </div>
            </form>
        </>
    );
}