import Auth from "@/components/auth"
import Seo from "@/components/seo"
import Fetch from "@/fetch";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react"
import { useSession } from 'next-auth/react'
import Loader from '@/components/loader/auth'
import { useRouter } from "next/router";

export default function Login() {
    const { status, data: session } = useSession();
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [loader, setLoader] = useState<boolean>(false)
    const router = useRouter()
    if (status === "authenticated") {
        if (session.user?.email === "infodcardbd@gmail.com") {
            router.push("/my-account/admin");
        } else {

            router.push("/my-account");
        }
    }
    const login = (event: any) => {
        event.preventDefault();
        const user = {
            username: event.target.username.value ? event.target.username.value.toLowerCase() : "",
            password: event.target.password.value || "",
        };
        setLoader(true);
        setSuccessMessage("");
        setErrorMessage("");
        Fetch("/api/login", {
            method: "POST",
            body: user
        }).then((res) => {
            if (res.status === 200) {
                setErrorMessage("");
                setSuccessMessage(res.body.message)
                signIn("credentials", { redirect: false, ...res.body.user });
            } else {
                setLoader(false);
                setSuccessMessage("");
                setErrorMessage(res.body.message);
            }
        })
    }
    if (status === "loading") {
        return <>
            <Seo title="Login" />
            <Loader />
        </>
    }
    if (status === "unauthenticated") {
        return (
            <>
                <Seo title="Login" />
                <Auth>
                    <div className="box rounded-2xl w-full">
                        <div className="text-center">
                            <Link href="/" title="Home | Infodcard"><Image className="w-10 h-10 inline-block" src="/favicon.ico" width={100} height={100} alt="Infodcard" /></Link>
                            <h1 className="font-extrabold text-2xl mt-2 mb-5">Login</h1>
                        </div>
                        <form onSubmit={login}>
                            <div className="mb-2">
                                <label className="inp-label" htmlFor="email">Phone / Email</label>
                                <input disabled={loader} maxLength={50} minLength={5} name="username" className="inp-text" type="text" id="email" placeholder="Enter your phone / email" required />
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
                                {
                                    loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Login</button>
                                }
                            </div>
                        </form>
                        <div className="mt-4 text-center">
                            <p>Have not an account ? <Link className="link" href="/register">Create an account</Link></p>
                        </div>
                    </div>
                </Auth>
            </>
        );
    }
}