import Layout from '@/components/account'
import LocalBanks from '@/components/account/local-bank'
import Upgrade from '@/components/account/upgrade'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Seo from '@/components/seo'

export default function LocalBankPage() {
    const router = useRouter()
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login")
        }
    })
    return (
        <>
            <Seo title='Local Bank' />
            <Layout>
                {status === "loading" && <span className='bg-white/50 rounded-xl w-full h-96 inline-block animate-pulse'></span>}
                {session?.user?.name === "PREMIUM" || session?.user?.name === "BUSINESS" ? <LocalBanks /> : <Upgrade />}
            </Layout>
        </>
    );
}