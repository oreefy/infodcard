import Fetch from "@/fetch";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Update({ profile }: { profile: any }) {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ type: string, success: boolean, message: string }[]>();
  const [data, setData] = useState<any>(profile)
  const [website] = useState<any>(profile.socials.find((social: any) => { return social.title === "Website" }))
  const [facebook, setFacebook] = useState<any>(profile.socials.find((social: any) => { return social.title === "Facebook" }))
  const [whatsApp, setWhatsApp] = useState<any>(profile.socials.find((social: any) => { return social.title === "WhatsApp" }))
  const [socialYouYube, setSocialYouYube] = useState<any>(profile.socials.find((social: any) => { return social.title === "YouTube" }))
  const [map, setMap] = useState<any>(profile.socials.find((social: any) => { return social.title === "Map" }))
  const [twitter, setTwitter] = useState<any>(profile.socials.find((social: any) => { return social.title === "Twitter" }))
  const [instagram, setInstagram] = useState<any>(profile.socials.find((social: any) => { return social.title === "Instagram" }))
  const [linkedin, setLinkedin] = useState<any>(profile.socials.find((social: any) => { return social.title === "Linkedin" }))
  const [pinterest, setPinterest] = useState<any>(profile.socials.find((social: any) => { return social.title === "Pinterest" }))
  const [tiktok, setTikTok] = useState<any>(profile.socials.find((social: any) => { return social.title === "TikTok" }))
  const [reddit, setReddit] = useState<any>(profile.socials.find((social: any) => { return social.title === "Reddit" }))
  const [snapchat, setSnapchat] = useState<any>(profile.socials.find((social: any) => { return social.title === "Snapchat" }))
  const [freelancer, setFreelancer] = useState<any>(profile.socials.find((social: any) => { return social.title === "Freelancer" }))
  const [fiverr, setFiverr] = useState<any>(profile.socials.find((social: any) => { return social.title === "Fiverr" }))
  const [upwork, setUpwork] = useState<any>(profile.socials.find((social: any) => { return social.title === "UpWork" }))
  const [peopleperhour, setPeoplePerHour] = useState<any>(profile.socials.find((social: any) => { return social.title === "People Per Hour" }))
  const updateProfile = (event: any) => {
    event.preventDefault();
    setErrors([])
    setLoader(true)
    const input: any = {
      link: profile.link,
      socials: { update: [] }
    }
    if (profile.name !== event.target.fullname.value) { input.name = event.target.fullname.value || "" }
    if (profile.bio !== event.target.bio.value) { input.bio = event.target.bio.value || "" }
    if (profile.youtube !== event.target.youtube.value) { input.youtube = event.target.youtube.value || "" }
    if (profile.phone !== event.target.phone.value) { input.phone = event.target.phone.value || "" }
    if (profile.profession !== event.target.profession.value) { input.profession = event.target.profession.value || "" }
    if (profile.company !== event.target.company.value) { input.company = event.target.company.value || "" }
    if (profile.companyphone !== event.target.companyphone.value) { input.companyphone = event.target.companyphone.value || "" }
    if (profile.designation !== event.target.designation.value) { input.designation = event.target.designation.value || "" }
    if (profile.companyemail !== event.target.companyemail.value) { input.companyemail = event.target.companyemail.value || "" }
    if (profile.corporate !== event.target.corporate.value) { input.corporate = event.target.corporate.value || "" }
    if (profile.branch !== event.target.branch.value) { input.branch = event.target.branch.value || "" }
    if (profile.email !== event.target.email.value) { input.email = event.target.email.value || "" }
    if (profile.website !== event.target.website.value) { input.website = event.target.website.value || "" }
    if (profile.address !== event.target.address.value) { input.address = event.target.address.value || "" }
    profile.socials.map((social: any) => {
      switch (social.title) {
        case "Website":
          if (social.link !== event.target.website.value) {
            input.socials.update.push({ where: { unique: website.unique }, data: { title: "Website", link: event.target.website.value || "" } })
          }
          break;
        case "WhatsApp":
          if (social.link !== "https://wa.me/" + event.target.whatsapp.value) {
            input.socials.update.push({ where: { unique: whatsApp.unique }, data: { title: "WhatsApp", link: event.target.whatsapp.value ? `https://wa.me/${event.target.whatsapp.value ? event.target.whatsapp.value.includes("+") ? event.target.whatsapp.value : "+" + event.target.whatsapp.value : ""}` : "" } })
          }
          break;
        case "Facebook":
          if (social.link !== event.target.facebook.value) {
            input.socials.update.push({ where: { unique: facebook.unique }, data: { title: "Facebook", link: event.target.facebook.value || "" } })
          }
          break;
        case "YouTube":
          if (social.link !== event.target.socialYouYube.value) {
            input.socials.update.push({ where: { unique: socialYouYube.unique }, data: { title: "YouTube", link: event.target.socialYouYube.value } })
          }
          break;
        case "Map":
          if (social.link !== event.target.map.value) {
            input.socials.update.push({ where: { unique: map.unique }, data: { title: "Map", link: event.target.map.value } })
          }
          break;
        case "Twitter":
          if (social.link !== event.target.twitter.value) {
            input.socials.update.push({ where: { unique: twitter.unique }, data: { title: "Twitter", link: event.target.twitter.value } })
          }
          break;
        case "Instagram":
          if (social.link !== event.target.instagram.value) {
            input.socials.update.push({ where: { unique: instagram.unique }, data: { title: "Instagram", link: event.target.instagram.value } })
          }
          break;
        case "Linkedin":
          if (social.link !== event.target.linkedin.value) {
            input.socials.update.push({ where: { unique: linkedin.unique }, data: { title: "Linkedin", link: event.target.linkedin.value } })
          }
          break;
        case "Pinterest":
          if (social.link !== event.target.pinterest.value) {
            input.socials.update.push({ where: { unique: pinterest.unique }, data: { title: "Pinterest", link: event.target.pinterest.value } })
          }
          break;
        case "TikTok":
          if (social.link !== event.target.tiktok.value) {
            input.socials.update.push({ where: { unique: tiktok.unique }, data: { title: "TikTok", link: event.target.tiktok.value } })
          }
          break;
        case "Reddit":
          if (social.link !== event.target.reddit.value) {
            input.socials.update.push({ where: { unique: reddit.unique }, data: { title: "Reddit", link: event.target.reddit.value } })
          }
          break;
        case "Snapchat":
          if (social.link !== event.target.snapchat.value) {
            input.socials.update.push({ where: { unique: snapchat.unique }, data: { title: "Snapchat", link: event.target.snapchat.value } })
          }
          break;
        case "Freelancer":
          if (social.link !== event.target.freelancer.value) {
            input.socials.update.push({ where: { unique: freelancer.unique }, data: { title: "Freelancer", link: event.target.freelancer.value } })
          }
          break;
        case "Fiverr":
          if (social.link !== event.target.fiverr.value) {
            input.socials.update.push({ where: { unique: fiverr.unique }, data: { title: "Fiverr", link: event.target.fiverr.value } })
          }
          break;
        case "UpWork":
          if (social.link !== event.target.upwork.value) {
            input.socials.update.push({ where: { unique: upwork.unique }, data: { title: "UpWork", link: event.target.upwork.value } })
          }
          break;
        case "People Per Hour":
          if (social.link !== event.target.peopleperhour.value) {
            input.socials.update.push({ where: { unique: peopleperhour.unique }, data: { title: "People Per Hour", link: event.target.peopleperhour.value } })
          }
          break;
        default:
          null;
          break;
      }
    })
    Fetch("/api/account/profile/business/update", { method: "POST", body: input }).then((res) => {
      if (res.status === 200) {
        setErrors([]);
        router.push("/p/" + profile.link)
      } else {
        setErrors(res.body.errors)
      }
      setLoader(false)
    })
  }
  return (
    <form onSubmit={updateProfile} className="grid grid-cols-1 gap-3">
      <div className="box p-0 mb-0">
        <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
          <h3 className="text-center font-bold text-xl">Profile Info</h3>
        </div>
        <div className="p-3 grid grid-cols-1 gap-2">
          <div>
            <label className="inp-label" htmlFor="fullname"><i className="bi bi-star-fill text-red-600"></i> Full Name</label>
            <input onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} maxLength={50} className="inp-text" type="text" name="fullname" id="fullname" placeholder="Enter Your Name" />
            {errors && errors.map((error, index) => { return error.type === "fullname" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
          <div>
            <label className="inp-label" htmlFor="phone"><i className="bi bi-star-fill text-red-600"></i> Phone Number</label>
            <input onChange={(e) => setData({ ...data, phone: e.target.value })} value={data.phone} className="inp-text" type="tel" pattern="([0-9 +]){6,14}" name="phone" placeholder="Enter Your Phone Number" id="name" required />
            {errors && errors.map((error, index) => { return error.type === "phone" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
          <div>
            <label className="inp-label" htmlFor="bio">Bio</label>
            <input onChange={(e) => setData({ ...data, bio: e.target.value })} value={data.bio} maxLength={250} className="inp-text" type="text" name="bio" id="bio" placeholder="Enter Your Bio (Optional)" />
            {errors && errors.map((error, index) => { return error.type === "bio" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
          <div>
            <label className="inp-label" htmlFor="youtube">YouTube Intro Video</label>
            <input onChange={(e) => setData({ ...data, youtube: e.target.value })} value={data.youtube} maxLength={250} className="inp-text" type="text" name="youtube" id="youtube" placeholder="Enter Your YouTube Intro Video (Optional)" />
            {errors && errors.map((error, index) => { return error.type === "youtube" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
        </div>
      </div>
      <div className="box p-0 mb-0">
        <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
          <h3 className="text-center font-bold text-xl">Contact Info</h3>
        </div>
        <div className="p-3 grid grid-cols-1 gap-2">
          <div>
            <label className="inp-label" htmlFor="profession">profession</label>
            <input onChange={(e) => setData({ ...data, profession: e.target.value })} value={data.profession} maxLength={40} className="inp-text" type="text" name="profession" id="profession" placeholder="Enter Your Profession (Optional)" />
            {errors && errors.map((error, index) => { return error.type === "profession" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
          <div>
            <label className="inp-label" htmlFor="email">Email</label>
            <input onChange={(e) => setData({ ...data, email: e.target.value })} value={data.email} maxLength={70} className="inp-text" type="text" name="email" id="email" placeholder="Enter Your Email (Optional)" />
            {errors && errors.map((error, index) => { return error.type === "email" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
          <div>
            <label className="inp-label" htmlFor="address">Address</label>
            <textarea onChange={(e) => setData({ ...data, address: e.target.value })} value={data.address} maxLength={250} className="inp-text resize-none" name="address" id="address" placeholder="Enter Your Address (Optional)" />
            {errors && errors.map((error, index) => { return error.type === "website" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
        </div>
      </div>
      <div className="box p-0 mb-0">
        <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
          <h3 className="text-center font-bold text-xl">Company Info</h3>
        </div>
        <div className="p-3 grid grid-cols-1 gap-2">
          <div>
            <label className="inp-label" htmlFor="company">Company</label>
            <input onChange={(e) => setData({ ...data, company: e.target.value })} value={data.company} maxLength={70} className="inp-text" type="text" name="company" id="company" placeholder="Enter Your Company (Optional)" />
            {errors && errors.map((error, index) => { return error.type === "company" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
          <div>
            <label className="inp-label" htmlFor="designation">Designation</label>
            <input onChange={(e) => setData({ ...data, designation: e.target.value })} value={data.designation} maxLength={40} className="inp-text" type="text" name="designation" id="designation" placeholder="Enter Your Designation (Optional)" />
            {errors && errors.map((error, index) => { return error.type === "designation" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
          <div>
            <label className="inp-label" htmlFor="companyphone">Phone Number</label>
            <input onChange={(e) => setData({ ...data, companyphone: e.target.value })} value={data.companyphone} className="inp-text" type="tel" pattern="([0-9 +]){6,14}" name="companyphone" placeholder="Enter Your Phone Number" id="companyphone" />
            {errors && errors.map((error, index) => { return error.type === "companyphone" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
          <div>
            <label className="inp-label" htmlFor="companyemail">Email</label>
            <input onChange={(e) => setData({ ...data, companyemail: e.target.value })} value={data.companyemail} maxLength={70} className="inp-text" type="text" name="companyemail" id="companyemail" placeholder="Enter Your Email (Optional)" />
            {errors && errors.map((error, index) => { return error.type === "companyemail" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
          <div>
            <label className="inp-label" htmlFor="website">Website</label>
            <input onChange={(e) => setData({ ...data, website: e.target.value })} value={data.website} maxLength={80} className="inp-text" type="text" name="website" id="website" placeholder="Enter Your Website (Optional)" />
            {errors && errors.map((error, index) => { return error.type === "website" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
          <div>
            <label className="inp-label" htmlFor="corporate">Offie Address</label>
            <textarea onChange={(e) => setData({ ...data, corporate: e.target.value })} value={data.corporate} maxLength={250} className="inp-text resize-none" name="corporate" id="corporate" placeholder="Enter Your Office Address (Optional)" />
            {errors && errors.map((error, index) => { return error.type === "corporate" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
          <div>
            <label className="inp-label" htmlFor="branch">Branch Address</label>
            <textarea onChange={(e) => setData({ ...data, branch: e.target.value })} value={data.branch} maxLength={250} className="inp-text resize-none" name="branch" id="branch" placeholder="Enter Your Branch Address (Optional)" />
            {errors && errors.map((error, index) => { return error.type === "branch" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
          </div>
        </div>
      </div>
      <div className="box p-0 mb-0">
        <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
          <h3 className="text-center font-bold text-xl">Social Media</h3>
        </div>
        <div className="p-3 grid grid-cols-1 gap-2">
          <div>
            <label className="inp-label" htmlFor="whatsapp">{`WhatsApp (With Country Code)`}</label>
            <input onChange={(e) => setWhatsApp({ ...whatsApp, link: e.target.value })} value={whatsApp?.link ? whatsApp.link.replace("https://wa.me/", "") : ""} maxLength={70} className="inp-text mt-2" type="tel" pattern="([0-9 +]){6,14}" name="whatsapp" id="whatsapp" placeholder="WhatsApp +8801XXXXXXXXX" />
          </div>
          <div>
            <label className="inp-label" htmlFor="facebook">Facebook</label>
            <input onChange={(e) => setFacebook({ ...facebook, link: e.target.value })} value={facebook?.link || ""} maxLength={70} className="inp-text" type="text" name="facebook" id="facebook" placeholder="Facebook URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="socialYouYube">YouTube Chanel</label>
            <input maxLength={70} onChange={(e) => setSocialYouYube({ ...socialYouYube, link: e.target.value })} value={socialYouYube?.link || ""} className="inp-text" type="text" name="socialYouYube" id="socialYouYube" placeholder="YouTube Chanel (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="map">Map</label>
            <input maxLength={70} onChange={(e) => setMap({ ...map, link: e.target.value })} value={map?.link || ""} className="inp-text" type="text" name="map" id="map" placeholder="Map URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="twitter">Twitter</label>
            <input maxLength={70} onChange={(e) => setTwitter({ ...twitter, link: e.target.value })} value={twitter?.link || ""} className="inp-text" type="text" name="twitter" id="twitter" placeholder="Twitter URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="instagram">Instagram</label>
            <input maxLength={70} onChange={(e) => setInstagram({ ...instagram, link: e.target.value })} value={instagram?.link || ""} className="inp-text" type="text" name="instagram" id="instagram" placeholder="Lnstagram URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="linkedin">Linkedin</label>
            <input maxLength={70} onChange={(e) => setLinkedin({ ...linkedin, link: e.target.value })} value={linkedin?.link || ""} className="inp-text" type="text" name="linkedin" id="linkedin" placeholder="Linkedin URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="pinterest">Pinterest</label>
            <input maxLength={70} onChange={(e) => setPinterest({ ...pinterest, link: e.target.value })} value={pinterest?.link || ""} className="inp-text" type="text" name="pinterest" id="pinterest" placeholder="Pinterest URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="tiktok">TikTok</label>
            <input maxLength={70} onChange={(e) => setTikTok({ ...tiktok, link: e.target.value })} value={tiktok?.link || ""} className="inp-text" type="text" name="tiktok" id="tiktok" placeholder="Tiktok URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="reddit">Reddit</label>
            <input maxLength={70} onChange={(e) => setReddit({ ...reddit, link: e.target.value })} value={reddit?.link || ""} className="inp-text" type="text" name="reddit" id="reddit" placeholder="Reddit URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="snapchat">Snapchat</label>
            <input maxLength={70} onChange={(e) => setSnapchat({ ...snapchat, link: e.target.value })} value={snapchat?.link || ""} className="inp-text" type="text" name="snapchat" id="snapchat" placeholder="Snapchat URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="freelancer">Freelancer</label>
            <input maxLength={70} onChange={(e) => setFreelancer({ ...freelancer, link: e.target.value })} value={freelancer?.link || ""} className="inp-text" type="text" name="freelancer" id="freelancer" placeholder="Freelancer URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="fiverr">Fiverr</label>
            <input maxLength={70} onChange={(e) => setFiverr({ ...fiverr, link: e.target.value })} value={fiverr?.link || ""} className="inp-text" type="text" name="fiverr" id="fiverr" placeholder="Fiverr URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="upwork">Upwork</label>
            <input maxLength={70} onChange={(e) => setUpwork({ ...upwork, link: e.target.value })} value={upwork?.link || ""} className="inp-text" type="text" name="upwork" id="upwork" placeholder="Upwork URL (Optional)" />
          </div>
          <div>
            <label className="inp-label" htmlFor="peopleperhour">People Per Hour</label>
            <input maxLength={70} onChange={(e) => setPeoplePerHour({ ...peopleperhour, link: e.target.value })} value={peopleperhour?.link || ""} className="inp-text" type="text" name="peopleperhour" id="peopleperhour" placeholder="Peopleperhour URL (Optional)" />
          </div>
        </div>
      </div>
      <div className="text-center">
        {errors && errors.map((error, index) => { return error.type === "other" ? error.success ? <p className="mb-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mb-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
        {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Update</button>}
      </div>
    </form>
  );
}