import Layout from "@/components/layout";
import Seo from "@/components/seo";
import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <>
            <Seo title="About Us" />
            <Layout>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 items-center mb-5">
                    <div className="col-span-2 md:col-span-1">
                        <Image className="w-full h-auto rounded-lg" src="/default/about.png" width={100} height={100} alt="About Infodcard" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <div className="bg-white/50 rounded-lg overflow-hidden">
                            <h2 className="bg-white/60 text-2xl font-bold mb-2 px-4 py-3 text-center">Info Digital Card (Infodcard)</h2>
                            <p className="text-lg font-semibold p-3">{`NFC InfodCard specialize in creating innovative contactless solutions for networking and information sharing. The InfodCard produce digital business cards that utilize Near Field Communication (NFC) technology, allowing users to instantly transmit their contact details, social profiles, and other relevant information to smartphones with just a tap.`}</p>
                            <p className="text-lg font-semibold p-3">{`The NFC cards are typically the size of traditional cards and can be customized with a InfodCard branding. They offer a sustainable and convenient alternative to paper cards, with the added benefit of being able to update digital information without needing to reprint physical cards.`}</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">Performance</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">Securiy</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">Amazing UI</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">NFC Contact Share</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">Save to Contact</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">Profile Info</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">Products & Services</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">Custom Fields</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">Banking info</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">Contact Messaging</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">Intro Video</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">Business Info</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 duration-200 hover:scale-105">
                                <h4 className="font-bold text-md mb-1">QR Code</h4>
                                <p className="text-sm text-slate-700">Message....</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <h2 className="text-2xl font-bold mb-2 text-white">History</h2>
                        <p className="text-lg font-semibold text-white">{`...`}</p>
                    </div>
                    <div className="col-span-2">
                        <h2 className="text-2xl font-bold mb-2 text-white">Commitment</h2>
                        <p className="text-lg font-semibold text-white">{`...`}</p>
                    </div>
                </div>
            </Layout>
        </>
    )
}
