import Auth from "@/components/auth"
import Seo from "@/components/seo"
import Fetch from "@/fetch";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Loader from '@/components/loader/auth'

export default function Register() {
    const { status } = useSession()
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [loader, setLoader] = useState<boolean>(false);
    if (status === "authenticated") {
        router.push("/my-account")
    }
    if (status === "loading") {
        return (
            <>
                <Seo title="Register" />
                <Loader />
            </>
        )
    }
    const register = (event: any) => {
        event.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        setLoader(true);
        const user = {
            phone: event.target.phone.value || "",
            email: event.target.email.value || "",
            password: event.target.password.value || "",
        }
        Fetch("/api/register", {
            method: "POST",
            body: user
        }).then((res) => {
            if (res.status === 200) {
                setSuccessMessage(res.body.message);
                setErrorMessage("");
                signIn("credentials", { redirect: false, phone: user.phone, email: user.email.toLowerCase(), name: "FREE" });
            } else {
                setErrorMessage(res.body.message);
                setSuccessMessage("");
                setLoader(false);
            }
        })
    }
    if (status === "unauthenticated") {
        return (
            <>
                <Seo title="Register" />
                <Auth>
                    <div className="box rounded-2xl w-full">
                        <div className="text-center">
                            <Link href="/" title="Home | Infodcard"><Image className="w-10 h-10 inline-block" src="/favicon.ico" width={100} height={100} alt="Infodcard" /></Link>
                            <h1 className="font-extrabold text-2xl mt-2 mb-5">Create an Account</h1>
                        </div>
                        <form onSubmit={register}>
                            <div className="mb-2">
                                <label className="inp-label" htmlFor="phone">Phone</label>
                                <input disabled={loader} name="phone" className="inp-text" type="tel" pattern="([0-9 +]){6,14}" id="phone" placeholder="Enter your phone number" required />
                            </div>
                            <div className="mb-2">
                                <label className="inp-label" htmlFor="email">Email</label>
                                <input disabled={loader} maxLength={50} minLength={5} name="email" className="inp-text" type="email" id="email" placeholder="Enter your email address" required />
                            </div>
                            <div className="mb-2">
                                <label className="inp-label" htmlFor="password">Password</label>
                                <input disabled={loader} maxLength={32} minLength={6} name="password" className="inp-text" type="password" id="password" placeholder="Enter your password" required />
                            </div>
                            <div className="text-center mb-3">
                                {successMessage && <p className="font-bold text-green-900">{successMessage}</p>}
                                {errorMessage && <p className="font-bold text-red-800">{errorMessage}</p>}
                            </div>
                            <div className="text-center">
                                {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button disabled={loader} className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-800 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Create</button>}
                            </div>
                        </form>
                        <div className="mt-5 text-center">
                            <p>Already have an account? <Link className="link" href="/login">Login</Link></p>
                        </div>
                    </div>
                </Auth>
            </>
        );
    }
}