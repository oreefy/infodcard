import Layout from '@/components/account';
import Upgrade from '@/components/account/upgrade';
import Gallery from '@/components/account/gallery';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Seo from '@/components/seo';

export default function Product() {
    const router = useRouter()
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login")
        }
    })
    return (
        <>
            <Seo title='Gallery' />
            <Layout>
                {status === "loading" && <span className='bg-white/50 rounded-xl w-full h-96 inline-block animate-pulse'></span>}
                {session?.user?.name === "PREMIUM" || session?.user?.name === "BUSINESS" ? <Gallery /> : <Upgrade />}
            </Layout>
        </>
    );
}