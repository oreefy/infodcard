import Layout from "@/components/layout";
import Seo from "@/components/seo";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function InternalServerError() {
    const router = useRouter();
    return (
        <>
            <Seo title="500 - Internal Server Error" />
            <Layout>
                <main className="flex justify-center items-center p-3 min-h-screen">
                    <div className="box m-0 w-96 max-w-full text-center py-10">
                        <h1 className="font-bold text-2xl mb-3">Internal Server Error</h1>
                        <div className="flex flex-wrap justify-center items-center">
                            <Link className='bg-orange-200 px-5 py-1 rounded-xl active:scale-90 duration-200 m-1' href="/package">Package</Link>
                            <Link className='bg-lime-200 px-5 py-1 rounded-xl active:scale-90 duration-200 m-1' href="/shop">Shop</Link>
                            <Link className='bg-green-200 px-5 py-1 rounded-xl active:scale-90 duration-200 m-1' href="/register">Signup</Link>
                            <Link className='bg-white/50 px-5 py-1 rounded-xl active:scale-90 duration-200 m-1' href="/">Home</Link>
                            <button type='button' onClick={() => router.back()} className='bg-white/50 px-5 py-1 rounded-xl active:scale-90 duration-200 m-1'>Back</button>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    )
}
