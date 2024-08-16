import Seo from "@/components/seo";
import Header from "@/components/profile/header";
import Profile from "@/components/profile";
import Footer from "@/components/profile/footer";
import Youtube from "@/components/profile/youtube";
import Address from "@/components/profile/contact-info";
import CompanyInfo from "@/components/profile/company-info";
import Custom from "@/components/profile/custom";
import Products from "@/components/profile/products";
import Services from "@/components/profile/services";
import Gallery from "@/components/profile/gallery";
import QRcode from "@/components/profile/qr-code";
import Bank from "@/components/profile/bank";
import ContactUs from "@/components/profile/contact-us";
import { useState } from "react";
import Fetch from '@/fetch'

export async function getServerSideProps(context: any) {
    const response = await Fetch("/api/profile", { method: "POST", body: context.query, });
    switch (response.status) {
        case 200:
            return { props: { response: response.body } }
        case 404:
            return { notFound: true }
        default:
            return { redirect: { destination: '/500', permanent: false, } }
    }
}

export default function ProfilePage({ response }: any) {
    const [profile] = useState<any>(response);
    return (
        <>
            <Seo title="Profile" />
            <Profile>
                <Header
                    link={profile.link}
                    name={profile.name}
                    title={profile.bio}
                    cover={profile.cover}
                    profile={profile.avatar}
                    custom={profile.socials}
                />
                <Address
                    name={profile.name}
                    profession={profile.profession}
                    address={profile.address}
                    phone={profile.phone}
                    email={profile.email}
                />
                <Youtube link={profile.youtube} />
                <CompanyInfo
                    company={profile.company}
                    designation={profile.designation}
                    email={profile.companyemail}
                    phone={profile.companyphone}
                    corporate={profile.corporate}
                    branch={profile.branch}
                    website={profile.website}
                />
                <Custom group={profile.groupName} groups={profile.groupItems} />
                <Products products={profile.products} />
                <Services services={profile.services} />
                <Gallery images={profile.albums} />
                <Bank
                    mobiles={profile.mobileBanks}
                    locals={profile.localBanks}
                    internationals={profile.globalBanks}
                />
                <ContactUs link={profile.link} />
                <QRcode link={profile.link} image={profile.qr} />
                <Footer call={profile.phone} callTwo={profile.companyphone} save={profile} link={profile.link} />
            </Profile>
        </>
    )
}