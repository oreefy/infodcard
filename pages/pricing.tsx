import Layout from "@/components/layout";
import Seo from "@/components/seo";
import Image from "next/image";
import Link from "next/link";
import db from "@/database";

export default function Pricing() {
    return (
        <>
            <Seo title="Pricing" />
            <Layout>
                <h1 className="text-4xl font-bold text-center text-white mb-5">Choose Your Best Plan</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xl:gap-4 mb-3">
                    <div className="box m-0">
                        <div className="mb-3">
                            <h2 className="font-bold text-lg">{db.plan.FREE.plan}</h2>
                            <p className="text-3xl text-purple-700 font-bold">{db.plan.FREE.price + " " + db.plan.FREE.currency}</p>
                        </div>
                        <ul className="grid gap-2 mb-5">
                            {db.features.map((feature, index) => {
                                return (
                                    <li className="flex items-center" key={index}>
                                        {feature.free === true ? <i className="bi bi-check-circle-fill mr-1.5"></i> : feature.free === false ? <i className="bi bi-x-circle mr-1.5"></i> : (+feature.free || 0) >= 1 ? <i className="bi bi-check-circle-fill mr-1.5"></i> : <i className="bi bi-x-circle mr-1.5"></i>}
                                        <span className="font-semibold"><span className="mr-1.5 font-bold text-purple-900 rounded-full">{feature.free}</span>{feature.feature}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="text-center">
                            <Link className="text-xl font-bold px-6 py-2 rounded-lg bg-white/50 hover:bg-white/80 duration-200 active:scale-75 inline-block" href="/my-account">Continue</Link>
                        </div>
                    </div>
                    <div className="box m-0">
                        <div className="mb-3">
                            <h2 className="font-bold text-lg">{db.plan.PREMIUM.plan}</h2>
                            <p className="text-3xl text-purple-700 font-bold">{db.plan.PREMIUM.price + " " + db.plan.PREMIUM.currency}<sup className="text-slate-800 pl-2"><del>{db.plan.PREMIUM.regular} {db.plan.PREMIUM.currency}</del></sup></p>
                        </div>
                        <ul className="grid gap-2 mb-5">
                            {db.features.map((feature, index) => {
                                return (
                                    <li className="flex items-center" key={index}>
                                        {feature.premium === true ? <i className="bi bi-check-circle-fill mr-1.5"></i> : feature.premium === false ? <i className="bi bi-x-circle mr-1.5"></i> : (+feature.premium || 0) >= 1 ? <i className="bi bi-check-circle-fill mr-1.5"></i> : <i className="bi bi-x-circle mr-1.5"></i>}
                                        <span className="font-semibold"><span className="mr-1.5 font-bold text-purple-900 rounded-full">{feature.premium}</span>{feature.feature}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="text-center">
                            <Link className="text-xl font-bold px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 duration-200 text-white active:scale-75 inline-block" href="/my-account/upgrade">Upgrade</Link>
                        </div>
                    </div>
                    <div className="box m-0">
                        <div className="mb-3">
                            <h2 className="font-bold text-lg">{db.plan.BUSINESS.plan}</h2>
                            <p className="text-3xl text-purple-700 font-bold">{db.plan.BUSINESS.price + " " + db.plan.BUSINESS.currency}<sup className="text-slate-800 pl-2"><del>{db.plan.BUSINESS.regular} {db.plan.BUSINESS.currency}</del></sup></p>
                        </div>
                        <ul className="grid gap-2 mb-5">
                            {db.features.map((feature, index) => {
                                return (
                                    <li className="flex items-center" key={index}>
                                        {feature.business === true ? <i className="bi bi-check-circle-fill mr-1.5"></i> : feature.business === false ? <i className="bi bi-x-circle mr-1.5"></i> : (+feature.business || 0) >= 1 ? <i className="bi bi-check-circle-fill mr-1.5"></i> : <i className="bi bi-x-circle mr-1.5"></i>}
                                        <span className="font-semibold"><span className="mr-1.5 font-bold text-purple-900 rounded-full">{feature.business}</span>{feature.feature}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="text-center">
                            <Link className="text-xl font-bold px-6 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 duration-200 text-white active:scale-75 inline-block" href="/my-account/upgrade">Upgrade</Link>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
