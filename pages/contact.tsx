import Layout from "@/components/layout";
import Seo from "@/components/seo";
import db from "@/database";
import { Fetch } from "primepack/client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
    const [loader, setLoader] = useState<boolean>(false);
    const submit = async (event: any) => {
        event.preventDefault();
        setLoader(true);
        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            number: event.target.number.value,
            subject: event.target.subject.value,
            message: event.target.message.value,
        }
        const res = await Fetch("/api/account/message/contact/create", {
            method: "POST",
            body: data
        });
        if (res.status === 200) {
            event.target.reset();
            toast.success(res.body.message || "The message has been successfully send.");
        } else {
            toast.error(res.body.message || "Something went wrong.");
        }
        setLoader(false);
    }
    return (
        <>
            <Seo title="Contact Us" />
            <Layout>
                <div className="box p-0 overflow-hidden">
                    <div>
                        <h1 className="font-bold text-3xl text-center bg-white/50 p-3 md:p-4 uppercase">Contact Us</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 lg:gap-5 xl:gap-6">
                        <div>
                            <form className="grid grid-cols-2 gap-3" onSubmit={submit}>
                                <div>
                                    <label className="inp-label" htmlFor="name">Full Name</label>
                                    <input maxLength={100} className="inp-text" type="text" name="name" id="name" placeholder="Enter Your Full Name" required />
                                </div>
                                <div>
                                    <label className="inp-label" htmlFor="number">Phone Number</label>
                                    <input className="inp-text" type="tel" pattern="([0-9 +]){6,14}" name="number" id="number" placeholder="Enter Your Phone Number" required />
                                </div>
                                <div className="col-span-2">
                                    <label className="inp-label" htmlFor="email">Email Address</label>
                                    <input maxLength={100} className="inp-text" type="email" name="email" id="email" placeholder="Enter Your Email Address" required />
                                </div>
                                <div className="col-span-2">
                                    <label className="inp-label" htmlFor="subject">Subject</label>
                                    <input maxLength={200} className="inp-text" type="text" name="subject" id="subject" placeholder="Enter Your Subject" required />
                                </div>
                                <div className="col-span-2">
                                    <label className="inp-label" htmlFor="message">Message</label>
                                    <textarea maxLength={500} className="inp-text h-40" id="message" name="message" placeholder="Enter Your Message" required />
                                </div>
                                <div className="text-center col-span-2">
                                    {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Submit</button>}
                                </div>
                            </form>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <p className="opacity-80 hover:opacity-100 font-bold mb-2 break-words text-3xl">{db.footer.address.company}</p>
                            <p className="opacity-80 hover:opacity-100 mb-3 break-words text-xl">{db.footer.address.address}</p>
                            <p className="opacity-80 hover:opacity-100 break-words text-lg">{db.footer.address.phone}</p>
                            <p className="opacity-80 hover:opacity-100 break-words text-lg">{db.footer.address.email}</p>
                            <div className="mt-5">
                                <iframe className="h-60 w-full rounded-xl" src={db.footer.address.map} width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
