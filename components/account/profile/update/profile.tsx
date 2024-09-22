import Input from "@/components/account/profile/input";
import database from "@/database";
import { useState } from "react";

export default function ProfileInfo({ plan, profile, errors }: { plan: "FREE" | "PREMIUM" | "BUSINESS"; profile: any, errors: { type: string, success: boolean, message: string }[] }) {
  const db = database.planFeatures;
  const [username, setUsername] = useState<string>(profile.link || "");
  const [fullname, setFullname] = useState<string>(profile.name || "");
  const [phone, setPhone] = useState<string>(profile.phone || "");
  const [bio, setBio] = useState<string>(profile.bio || "");
  const [video, setVideo] = useState<string>(profile.youtube || "");
  return (
    <>
      <div className="box p-0 m-0 overflow-hidden">
        <div className="p-3 md:p-5 grid grid-cols-1 gap-3">
          <div><Input value={username} onChange={setUsername} plan={plan} field={db.profile.username} errors={errors} /></div>
          <div><Input value={fullname} onChange={setFullname} plan={plan} field={db.profile.fullname} errors={errors} /></div>
          <div><Input value={phone} onChange={setPhone} plan={plan} field={db.profile.phone} errors={errors} /></div>
          <div><Input value={bio} onChange={setBio} plan={plan} field={db.profile.bio} errors={errors} /></div>
          <div><Input value={video} onChange={setVideo} plan={plan} field={db.profile.video} errors={errors} /></div>
        </div>
      </div>
    </>
  );
}