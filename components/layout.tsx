import { PropsWithChildren } from 'react'
import Header from '@/components/guest/header'
import Fotoer from '@/components/guest/footer'
export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <main className='container mx-auto p-2 mt-16 min-h-screen'>{children}</main>
            <Fotoer />
        </>
    );
}