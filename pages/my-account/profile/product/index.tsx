import Layout from '@/components/account'
import Products from '@/components/account/product'
import Upgrade from '@/components/account/upgrade'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Seo from '@/components/seo'

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
            <Seo title='Product' />
            <Layout>
                {status === "loading" && <span className='bg-white/50 rounded-xl w-full h-96 inline-block animate-pulse'></span>}
                {session?.user?.name === "PREMIUM" || session?.user?.name === "BUSINESS" ? <Products /> : <Upgrade />}
            </Layout>
        </>
    );
}