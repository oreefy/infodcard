import ProfileComponent from '@/components/account/profile/update/profile';
import ContactComponent from '@/components/account/profile/update/contact';
import CompanyComponent from '@/components/account/profile/update/company';
import SocialsComponent from '@/components/account/profile/update/socials';
import FileComponent from '@/components/account/profile/update/file';
import Fetch from "@/fetch";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from 'next-auth/react';

export default function UpdateProfile({ profile }: { profile: any }) {
    const router = useRouter();
    const { data: session } = useSession();
    const [loader, setLoader] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ type: string, success: boolean, message: string }[]>([]);
    function update(event: any) {
        event.preventDefault();
        setLoader(true);
        const input = {
            profileLink: profile?.link,
            link: event.target?.username?.value !== profile.link ? event.target?.username?.value : undefined,
            name: event.target?.fullname?.value !== profile.fullname ? event.target?.fullname?.value : undefined,
            phone: event.target?.phone?.value !== profile.phone ? event.target?.phone?.value : undefined,
            bio: event.target?.bio?.value !== profile.bio ? event.target?.bio?.value : undefined,
            youtube: event.target?.video?.value !== profile.video ? event.target?.video?.value : undefined,
            profession: event.target?.profession?.value !== profile.profession ? event.target?.profession?.value : undefined,
            email: event.target?.email?.value !== profile.email ? event.target?.email?.value : undefined,
            address: event.target?.address?.value !== profile.address ? event.target?.address?.value : undefined,
            company: event.target?.company?.value !== profile.company ? event.target?.company?.value : undefined,
            designation: event.target?.designation?.value !== profile.designation ? event.target?.designation?.value : undefined,
            companyphone: event.target?.number?.value !== profile.number ? event.target?.number?.value : undefined,
            companyemail: event.target?.companyemail?.value !== profile.companyemail ? event.target?.companyemail?.value : undefined,
            website: event.target?.website?.value !== profile.website ? event.target?.website?.value : undefined,
            corporate: event.target?.officeAddress?.value !== profile.officeAddress ? event.target?.officeAddress?.value : undefined,
            branch: event.target?.branchAddress?.value !== profile.branchAddress ? event.target?.branchAddress?.value : undefined,
        };
        Fetch("/api/account/profile/update", { method: "POST", body: input }).then((res) => {
            if (res.status === 200) {
                setErrors([]);
                router.push("/p/" + res.body.profile.link);
            } else {
                setErrors(res.body.errors);
            }
            setLoader(false);
        })
    }
    return (
        <>
            <form onSubmit={update} className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><FileComponent plan={session?.user?.name as any} profile={profile} /></div>
                <div className="col-span-2"><SocialsComponent plan={session?.user?.name as any} profile={profile} /></div>
                <div className="col-span-2"><ProfileComponent plan={session?.user?.name as any} profile={profile} errors={errors} /></div>
                <div className="col-span-2"><ContactComponent plan={session?.user?.name as any} profile={profile} errors={errors} /></div>
                <div className="col-span-2"><CompanyComponent plan={session?.user?.name as any} profile={profile} errors={errors} /></div>
                <div className="text-center col-span-2">
                    {errors && errors.map((error, index) => { return error.type === "other" ? error.success ? <p className="mb-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mb-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
                    {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full inline-block">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Update</button>}
                </div>
            </form>
        </>
    );
}