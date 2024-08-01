import Layout from "@/components/layout";
import Seo from "@/components/seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function NotFound() {
    const router = useRouter();
    return (
        <>
            <Seo title="404 - Not Found" />
            <Layout>
                <div className="box mb-0 w-full min-h-96 flex items-center justify-center">
                    <div className='w-full max-w-lg text-center md:py-10'>
                        <div className='text-center'>
                            <Image className='inline-block' src="/default/404.png" width={200} height={200} alt="Upgrade Image - InfodCard" />
                        </div>
                        <div className='mb-5'>
                            <h1 className='text-3xl font-bold tracking-wide my-3'>404 - Not Found.</h1>
                            <p className='text-lg font-semibold'>The URL you requested could not be found on this server.</p>
                        </div>
                        <div>
                            <Link className='inline-block px-4 py-2 bg-white/50 hover:bg-white active:scale-90 duration-200 rounded-lg font-bold' href="/shop">Products</Link>
                            <button onClick={() => router.back()} className='inline-block px-4 py-2 active:scale-90 hover:text-purple-900 duration-200 rounded-lg font-bold' type='button'>Go Back</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
