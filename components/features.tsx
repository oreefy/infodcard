import Image from "next/image";
import database from "@/database";

export default function FeaturesComponent() {
    const features = database.features;
    return (
        <>
            <div className="box rounded-lg p-0 overflow-hidden mb-0">
                <h2 className="px-3 py-2 bg-white/50 text-center text-2xl font-bold">Features</h2>
                <div className="p-3 overflow-x-auto scroll">
                    <table className="w-full table table-auto">
                        <thead>
                            <tr className="bg-white hover:bg-white/80 duration-200">
                                <th className="px-3 py-2 border border-slate-400 text-start text-lg">Feature</th>
                                <th className="px-3 py-2 border border-slate-400 text-center text-lg">Free</th>
                                <th className="px-3 py-2 border border-slate-400 text-center text-lg">Premium</th>
                                <th className="px-3 py-2 border border-slate-400 text-center text-lg">Business</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, index) => {
                                return (<tr className="hover:bg-white/50 duration-200" key={index}>
                                    <td className="px-3 py-2 border border-slate-400 min-w-[200px] text-start text-md font-semibold">{feature.feature}</td>
                                    <td className="px-3 py-2 border border-slate-400 min-w-[80px] text-center">{typeof feature.free === "string" ? feature.free : feature.free ? <i className="bi bi-check2"></i> : <i className="bi bi-x-lg"></i>}</td>
                                    <td className="px-3 py-2 border border-slate-400 min-w-[80px] text-center">{typeof feature.premium === "string" ? feature.premium : feature.premium ? <i className="bi bi-check2"></i> : <i className="bi bi-x-lg"></i>}</td>
                                    <td className="px-3 py-2 border border-slate-400 min-w-[80px] text-center">{typeof feature.business === "string" ? feature.business : feature.business ? <i className="bi bi-check2"></i> : <i className="bi bi-x-lg"></i>}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}