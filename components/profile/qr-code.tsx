import Image from "next/image";
import Link from "next/link";

export default function QrCode({ image, link }: { image: string; link: string }) {    
    const shareScript = () => {
        if (navigator.share) {
            navigator.share({
                title: "My Infodcard Profile",
                text: "My Infodcard Profile",
                url: "https://www.infodcard.com/p/" + link,
            })
        }
    }
    return (
        <>
            <section className="box mb-20">
                <div className="text-center">
                    <div className="grid grid-cols-1 gap-5 px-10">
                        <div className="text-center">
                            <Link href={image} download target="_blank">
                                <Image className="w-36 h-36 object-cover object-center inline-block border-4 border-black p-2 bg-white rounded-xl" src={image} width={100} height={100} alt="Bank Logo" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/50 hover:bg-white/80 active:scale-90 duration-200 h-12 shadow-md shadow-black/30 rounded-lg">
                                <Link className="w-full h-full flex justify-center items-center" href={image} download target="_blank"><i className="bi bi-download mr-2"></i> <span>Download</span></Link>
                            </div>
                            <div className="bg-blue-700 text-white hover:bg-blue-900 active:scale-90 duration-200 h-12 shadow-md shadow-black/30 rounded-lg">
                                <button onClick={shareScript} className="w-full h-full"><i className="bi bi-share mr-2"></i> <span>Share</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}