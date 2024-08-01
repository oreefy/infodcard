import '@/styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, [router]);
  return <SessionProvider session={session}>
    <Component {...pageProps} />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </SessionProvider>
}
