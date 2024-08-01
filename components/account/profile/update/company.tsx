import Input from "@/components/account/profile/input";
import database from "@/database";
import { useState } from "react";

export default function CompanyInfo({ plan, profile, errors }: { plan: "FREE" | "PREMIUM" | "BUSINESS"; profile: any, errors: { type: string, success: boolean, message: string }[] }) {
    const db = database.planFeatures;
    const [company, setCompany] = useState<string>(profile.company || "");
    const [designation, setDesignation] = useState<string>(profile.designation || "");
    const [number, setNumber] = useState<string>(profile.companyphone || "");
    const [companyemail, setCompanyemail] = useState<string>(profile.companyemail || "");
    const [website, setWebsite] = useState<string>(profile.website || "");
    const [officeAddress, setOfficeAddress] = useState<string>(profile.corporate || "");
    const [branchAddress, setBranchAddress] = useState<string>(profile.branch || "");
    return (
        <>
            <div className="box p-0 m-0 overflow-hidden">
                <h3 className="box m-0 rounded-none font-bold">company Info</h3>
                <div className="p-3 md:p-5 grid grid-cols-1 gap-3">
                    <div><Input value={company} onChange={setCompany} plan={plan} field={db.company.company} errors={errors} /></div>
                    <div><Input value={designation} onChange={setDesignation} plan={plan} field={db.company.designation} errors={errors} /></div>
                    <div><Input value={number} onChange={setNumber} plan={plan} field={db.company.number} errors={errors} /></div>
                    <div><Input value={companyemail} onChange={setCompanyemail} plan={plan} field={db.company.companyemail} errors={errors} /></div>
                    <div><Input value={website} onChange={setWebsite} plan={plan} field={db.company.website} errors={errors} /></div>
                    <div><Input value={officeAddress} onChange={setOfficeAddress} plan={plan} field={db.company.officeAddress} errors={errors} /></div>
                    <div><Input value={branchAddress} onChange={setBranchAddress} plan={plan} field={db.company.branchAddress} errors={errors} /></div>
                </div>
            </div>
        </>
    );
}