import Link from "next/link";
import Image from "next/image";
import Vcf from "@/middleware/vcf";

export default function Footer({ call, callTwo, link, save }: { call: string, callTwo?: string, link: string, save?: any }) {
    const shareScript = () => {
        if (navigator.share) {
            navigator.share({
                title: "My Infodcard Profile",
                text: "My Infodcard Profile",
                url: "https://www.infodcard.com/p/" + link,
            })
        }
    }
    const saveScript = () => {
        Vcf(save);
    }
    return (
        <>
            <footer className="fixed bottom-0 w-full left-0 right-0">
                <div className="container bg-white/50 mx-auto max-w-md p-2 rounded-t-2xl">
                    <div className="flex justify-center items-center">
                        <div className="shrink-0">
                            <Link href={`tel:${call}`} className="rounded-xl active:scale-90 duration-200 overflow-hidden" target="_blank" title="Call">
                                <Image className="w-20 h-12 object-cover object-center rounded-xl mx-1 active:scale-90 duration-200" src="/default/footer-call-default.png" width={50} height={50} alt="Call Logo" />
                            </Link>
                        </div>
                        {
                            callTwo && <div className="shrink-0">
                                <Link href={`tel:${callTwo}`} className="rounded-xl active:scale-90 duration-200 overflow-hidden" target="_blank" title="Call">
                                    <Image className="w-20 h-12 object-cover object-center rounded-xl mx-1 active:scale-90 duration-200" src="/default/footer-call-optional.png" width={50} height={50} alt="Call Logo" />
                                </Link>
                            </div>
                        }
                        <div className="shrink-0">
                            <button onClick={() => saveScript()} type="button" className="rounded-xl active:scale-90 duration-200 overflow-hidden" title="Save">
                                <Image className="w-20 h-12 object-cover object-center rounded-xl mx-1 active:scale-90 duration-200" src="/default/save.png" width={50} height={50} alt="Call Logo" />
                            </button>
                        </div>
                        <div className="shrink-0">
                            <button onClick={() => shareScript()} type="button" className="rounded-xl active:scale-90 duration-200 overflow-hidden" title="Share">
                                <Image className="w-20 h-12 object-cover object-center rounded-xl mx-1 active:scale-90 duration-200" src="/default/share.png" width={50} height={50} alt="Call Logo" />
                            </button>
                        </div>
                    </div>
                </div>
            </footer >
        </>
    );
}