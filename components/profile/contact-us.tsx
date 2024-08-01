import Fetch from "@/fetch";
import { useState } from "react";

export default function ContactUs({ link = "" }: { link: string }) {
    const [contactMessage, setContactMessage] = useState<string>("")
    const [contactMessageLoader, setContactMessageLoader] = useState<boolean>(false)
    const contact = (event: any) => {
        event.preventDefault();
        setContactMessage("");
        const input = {
            link: link,
            name: event.target.name.value || "",
            number: event.target.number.value || "",
            message: event.target.message.value || "",
        }
        const reset = () => {
            event.target.name.value = "";
            event.target.number.value = "";
            event.target.message.value = "";
        }
        setContactMessageLoader(true);
        Fetch("/api/account/message", { method: "POST", body: input }).then((res) => {
            if (res.status === 200) {
                setContactMessage(res.body.message || "Your message has been successfully sent.");
                reset()
            } else {
                setContactMessage(res.body.message || "Internal Server Error.");
            }
            setContactMessageLoader(false);
        })
    }
    return (
        <>
            <section className="box">
                <h2 className="font-extrabold p-2 rounded-xl flex items-center">
                    <i className="bi bi-person-lines-fill mr-3 px-3 py-2 rounded-full text-3xl bg-white/50"></i>
                    <span className="text-2xl uppercase">Contact Us</span>
                </h2>
                <form className="mt-2" onSubmit={contact}>
                    <div className="mb-3">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <input className="inp-text" type="text" name="name" placeholder="Enter Your Full Name" />
                            </div>
                            <div>
                                <input className="inp-text" type="tel" pattern="([0-9 +]){6,14}" name="number" placeholder="Your Phone Number" />
                            </div>
                            <div className="col-span-2">
                                <textarea className="inp-text resize-none h-24" name="message" placeholder="Your Message..."></textarea>
                            </div>
                        </div>
                        {contactMessageLoader && <span className="w-full h-10 bg-white/20 block rounded-xl mt-2"></span>}
                        {contactMessage && <p className="bg-green-800 text-white pl-4 pr-2 py-2 rounded-lg flex justify-between items-center duration-200">
                            <span>{contactMessage}</span>
                            <button title="Send Message" type="button" onClick={() => setContactMessage("")} className="px-2 py-1 bg-white/20 rounded-md"><i className="bi bi-x"></i></button>
                        </p>}
                    </div>
                    <div className="mb-3 text-center">
                        <button disabled={contactMessageLoader} className="w-32 p-1.5 bg-white/50 text-lg font-semibold rounded-xl hover:bg-white active:w-52 duration-200 active:scale-90" type="submit">
                            <i className="bi bi-send mr-2"></i>
                            <span>{contactMessageLoader ? "Wait..." : "Send"}</span>
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}
