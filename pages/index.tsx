import Layout from "@/components/layout";
import Seo from "@/components/seo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Seo
        title="Infodcard - Your Info Digital Card"
        description="The Infodcard makes you competent in the world with your premium quality profile. Also, Infodcard shares your information better than your local visiting card."
        keywords="infodcard, nfc business card, infocard, nfc card, smart card"
      />
      <Layout>
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center lg:-mt-12">
          <div className="p-4 text-white">
            <h1 className="font-extrabold text-2xl lg:text-4xl mb-5">Info Digital Card</h1>
            <p className="font-semiblod text-xl">About infodcard software. The infodcard means info digital card for all person who wish share theire information smartly.</p>
            <Link className="p-3 bg-white/10 rounded-xl inline-block mt-5" href="/shop">Products</Link>
            <Link className="p-3 bg-white/10 rounded-xl inline-block mt-5 ml-3" href="/pay">Payment</Link>
          </div>
          <div className="p-5 lg:p-20">
            <Image className="w-full h-full object-center object-cover" src="/default/home-title-image.png" width={200} height={200} alt="infodcard Title Image" />
          </div>
        </div>
      </Layout>
    </>
  )
}
