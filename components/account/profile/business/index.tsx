import CreateProfile from "@/components/account/profile/create";
import UpdateProfile from "@/components/account/profile/update";
import Fetch from "@/fetch";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateBusinessProfile() {
    const [loader, setLoader] = useState<boolean>(true)
    const [creator, setCreator] = useState<boolean>(false)
    const [updator, setUpdater] = useState<{} | null>(null)
    const [profile, setProfile] = useState<any[] | null>(null);
    const [deleted, setDeleted] = useState<string>("");
    const [profileLength, setProfileLength] = useState<number>(1);
    const [fulfill, setFulfill] = useState<boolean>(false);
    useEffect(() => {
        Fetch("/api/account/profile/business/views", { method: "POST" }).then((res) => {
            if (res.status === 200) {
                setProfile(res.body.profiles);
                setFulfill(res.body.fulfill);
                setProfileLength(res.body.profileLength);
                setLoader(false)
            } else {
                setProfile(null)
                setLoader(false)
            }
        })
    }, [])
    const deleteAction = (link: string) => {
        setDeleted(link);
        Fetch("/api/account/profile/business/delete", { method: "POST", body: { link: link } }).then((res) => {
            if (res.status === 200) {
                setDeleted("");
                setProfile(profile!.filter(data => data.link != link))
                setFulfill(((profile?.length || 1) - 1) >= profileLength);
                toast.success(res.body.message || "The profile has been successfully deleted.")
            } else {
                setDeleted("");
                toast.error(res.body.message || "Something went wrong.")
            }
        })
    }
    return (
        <>
            

        </>
    );
}