import db from "@/database";
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <div className="bg-slate-950 mb-0 rounded-none text-white px-3 py-5 md:py-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <section>
                            <h4 className="font-extrabold mb-3 break-words">{db.footer.company.title}</h4>
                            <Link className="opacity-70 hover:opacity-100 block p-0.5 break-words" href="/about">{db.footer.company.about}</Link>
                            <Link className="opacity-70 hover:opacity-100 block p-0.5 break-words" href="/contact">{db.footer.company.contact}</Link>
                            <Link className="opacity-70 hover:opacity-100 block p-0.5 break-words" href="/shop">{db.footer.company.products}</Link>
                            <Link className="opacity-70 hover:opacity-100 block p-0.5 break-words" href="/reviews">{db.footer.company.reviews}</Link>
                            <Link className="opacity-70 hover:opacity-100 block p-0.5 break-words" href="/my-account/earning">{db.footer.company.partner}</Link>
                            <Link className="opacity-70 hover:opacity-100 block p-0.5 break-words" href="/privacy-policy">{db.footer.company.privacyPolicy}</Link>
                            <Link className="opacity-70 hover:opacity-100 block p-0.5 break-words" href="/terms-and-conditions">{db.footer.company.termsConditions}</Link>
                        </section>
                        <section>
                            <h4 className="font-extrabold mb-3 break-words">Social Media</h4>
                            {db.footer.socials.map((link, index) => { return (<Link key={index} className="opacity-70 hover:opacity-100 block p-0.5 break-words" href={link.url} target="_blank">{link.title}</Link>) })}
                        </section>
                        <section>
                            <h4 className="font-extrabold mb-3 break-words">Shop</h4>
                            {db.footer.products.map((shop, index) => { return (<Link key={index} className="opacity-70 hover:opacity-100 block p-0.5 break-words" href={shop.url}>{shop.title}</Link>) })}
                        </section>
                        <section className="col-span-2 md:col-span-1">
                            <h4 className="opacity-80 hover:opacity-100 font-extrabold mb-3 break-words">{db.footer.address.title}</h4>
                            <p className="opacity-80 hover:opacity-100 font-semibold mb-2 break-words">{db.footer.address.company}</p>
                            <p className="opacity-80 hover:opacity-100 mb-3 break-words">{db.footer.address.address}</p>
                            <p className="opacity-80 hover:opacity-100 break-words">{db.footer.address.phone}</p>
                            <p className="opacity-80 hover:opacity-100 break-words">{db.footer.address.email}</p>
                        </section>
                    </div>
                    <div className="text-end pt-4">
                        <p>{db.footer.copyright}</p>
                    </div>
                </div>
            </div>
        </>
    );
}