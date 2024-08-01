import Image from "next/image";
import Link from "next/link";

export default function ProfileLink({ image, title, link }: { image?: string; title?: string; link?: string }) {
    return (
        <Link href={link || "/"} className="box p-2 mb-0 active:scale-90 duration-200">
            <div className=" bg-gradient-to-tr from-slate-600 text-center rounded-t-3xl rounded-b-lg">
                <Image className="h-28 w-28 p-3 inline-block object-cover object-center" src={image || "/default/manage.png"} height={100} width={100} alt={title || ""}></Image>
            </div>
            <h2 className="text-center px-1 pt-1 text-md font-bold">{title}</h2>
        </Link>
    );
}