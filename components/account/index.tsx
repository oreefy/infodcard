import { PropsWithChildren, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Loader from '@/components/account'
import Fetch from '@/fetch'
import { toast } from 'react-toastify'

export default function DashboardLayout({ children }: PropsWithChildren) {
    const router = useRouter()
    const [loader, setLoader] = useState<boolean>(true);
    const [tk, setTk] = useState<number>(0);
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login");
        }
    });
    const loadData = async () => {
        setLoader(true);
        const res = await Fetch("/api/account/earning", { method: "POST" });
        if (res.status === 200) {
            setLoader(false);
            setTk(res.body.earning.total);
        } else {
            setTk(0);
            toast.error(res.body.message || "Something went wrong.")
        }
    }
    useEffect(() => {
        if (status === "authenticated") {
            loadData();
        }
    }, [status])
    if (status === "loading") {
        <Loader />
    }
    if (status === "authenticated") {
        return (
            <>
                <div className='container mx-auto min-h-screen'>
                    <header className='sticky top-0 left-0 right-0 bg-white/60 backdrop-blur-sm p-3 rounded-b-3xl flex justify-between items-center'>
                        <div>
                            <Link href="/"><Image className='w-10 h-10 object-cover object-center active:scale-75 duration-200' src="/favicon.ico" width={75} height={75} alt='InfodCard Logo'></Image></Link>
                        </div>
                        <div className='flex'>
                            <Link className='bg-white/60 py-2 px-3 rounded-full active:scale-75 duration-200 mr-2 relative' href="/shop" title='Shop'>
                                <i className='bi bi-shop text-xl'></i>
                            </Link>
                            {session?.user?.email === "infodcardbd@gmail.com" && <Link className='bg-white/60 py-2 px-3 rounded-full active:scale-75 duration-200 mr-2 relative' href="/my-account/admin" title='Admin Dashboard'>
                                <i className='bi bi-speedometer2 text-xl'></i>
                            </Link>}
                            {session?.user?.name !== "BUSINESS" && session?.user?.name !== "PREMIUM" && <Link className='bg-yellow-200/60 py-2 px-3 rounded-full active:scale-75 duration-200 mr-2 relative' href="/my-account/upgrade" title='Upgrade'>
                                <i className='bi bi-rocket text-xl rotate-45 inline-block'></i>
                            </Link>}
                            <Link className='flex justify-center items-center bg-white/60 p-2 rounded-xl active:scale-75 duration-200' href="/my-account/earning" title='Earning'>
                                <Image className='w-6 h-6 object-cover object-center mr-1' src="/default/coin.png" width={75} height={75} alt='InfodCard Logo' ></Image>
                                <span className='flex items-center justify-center'>{loader ? <span className='w-5 h-5 inline-block bg-black/20 rounded-full animate-pulse'></span> : tk}</span>
                            </Link>
                        </div>
                    </header>
                    <main className='p-4'>{children}</main>
                    <div className="px-3 flex items-start justify-center">
                        <div className='box text-center p-1.5 grid grid-cols-2 gap-0 max-w-md'>
                            <Link href="/my-account" className="text-xs px-5 py-2 bg-white/50 rounded-l-lg active:scale-75 duration-200" type="button">Dashboard</Link>
                            <button onClick={() => signOut({ redirect: false })} className="text-xs py-2 px-5 bg-red-600 rounded-r-lg text-white active:scale-75 duration-200" type="button">Logout</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}