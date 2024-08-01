import Image from "next/image";
import Link from "next/link";

export default function Header({ link, cover = "/default/cover.jpg", profile = "/default/profile.png", name = "Infodcard User", title = "", custom }: { link: string; cover?: string; profile?: string; name?: string; title?: string; custom?: { type: boolean; logo?: string; link: string; title: string; }[] }) {
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
            <header className="box p-0 text-center">
                <Image className="w-full h-full max-h-60 min-h-60 rounded-t-lg rounded-b-none object-cover object-center" width={300} height={100} src={cover} alt="Cover Photo" />
                <Image className="w-36 h-36 object-cover object-center -mt-32 rounded-full shadow-xl shadow-slate-800 inline-block ring-8 ring-white bg-white" width={300} height={100} src={profile || "/default/profile.jpg"} alt="Profile Photo" />
                <div className="mt-4 pb-2">
                    <h1 className="text-3xl font-extrabold text-black">{name}</h1>
                    <p className="font-bold text-lg text-slate-800 px-5">{title}</p>
                </div>
                <div>
                    <ul className="list-none flex justify-center flex-wrap pb-5 px-5">
                        {custom && custom.map((data, index) => { return data.link ? <li key={index} className="p-1"><Link href={data.link} title={data.title} className="action-btn" target="_blank">{data.type ? data.logo ? <i className={data.logo}></i> : <i className="bi bi-circle"></i> : data.logo ? <Image className="w-5 h-7 object-cover object-center rounded-full active:scale-75" width={50} height={50} src={data.logo} alt={data.title} /> : <i className="bi bi-circle"></i>}</Link></li> : "" })}
                        <li className="p-1"><button onClick={shareScript} title="Share" className="action-btn"><i className="bi bi-share"></i></button></li>
                    </ul>
                </div>
            </header >
        </>
    );
}