import Input from "@/components/account/profile/input";
import database from "@/database";
import { useState } from "react";

export default function ContactInfo({ plan, profile, errors }: { plan: "FREE" | "PREMIUM" | "BUSINESS"; profile: any, errors: { type: string, success: boolean, message: string }[] }) {
    const db = database.planFeatures;
    const [profession, setProfession] = useState<string>(profile.profession || "");
    const [email, setEmail] = useState<string>(profile.email || "");
    const [address, setAddress] = useState<string>(profile.address || "");
    return (
        <>
            <div className="box p-0 m-0 overflow-hidden">
                <h3 className="box m-0 rounded-none font-bold">Contact Info</h3>
                <div className="p-3 md:p-5 grid grid-cols-1 gap-3">
                    <div><Input value={profession} onChange={setProfession} plan={plan} field={db.contact.profession} errors={errors} /></div>
                    <div><Input value={email} onChange={setEmail} plan={plan} field={db.contact.email} errors={errors} /></div>
                    <div><Input value={address} onChange={setAddress} plan={plan} field={db.contact.address} errors={errors} /></div>
                </div>
            </div>
        </>
    );
}