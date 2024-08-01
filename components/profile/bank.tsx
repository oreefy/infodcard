import Image from "next/image";

export default function Bank({ mobiles = [], locals = [], internationals = [] }: {
    mobiles?: { logo: string; name: string; type: string; number: string }[];
    locals?: { logo: string; bank: string; name: string; number: string; branch: string }[];
    internationals?: { logo: string; bank: string; lineOne: string; lineTwo?: string; lineThree?: string }[];
}) {
    return (
        <>
            {
                mobiles.length >= 1 || locals.length >= 1 || internationals.length >= 1 ? <section className="box">
                    <h2 className="font-extrabold p-2 rounded-xl flex items-center">
                        <i className="bi bi-person-lines-fill mr-3 px-3 py-2 rounded-full text-3xl bg-white/50"></i>
                        <span className="text-2xl uppercase">Bank Info</span>
                    </h2>
                    {
                        mobiles.length >= 1 && <div className="mb-5 mt-3">
                            <h3 className="font-bold flex justify-center items-center mb-2 bg-red-400 p-2 rounded-lg">
                                <i className="bi bi-phone mr-1 text-lg"></i>
                                <span>Mobile Banking</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {
                                    mobiles && mobiles.map((mobile, index) => {
                                        return <div key={index} className="rounded-xl bg-white/30 p-3 text-center">
                                            <Image className="w-20 h-20 object-cover object-center rounded-xl inline-block mb-2" src={mobile.logo} width={100} height={100} alt={mobile.name}></Image>
                                            <div>
                                                <h3>
                                                    <span className="font-bold text-xl mr-1">{mobile.name}</span>
                                                    <span className="font-semibold">{`(${mobile.type})`}</span>
                                                </h3>
                                                <h4 className="font-bold text-xl mr-1">{mobile.number}</h4>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {
                        locals.length >= 1 && <div className="mb-5">
                            <h3 className="font-bold flex justify-center items-center mb-2 bg-green-400 p-2 rounded-lg">
                                <i className="bi bi-bank mr-1 text-lg"></i>
                                <span>Local Bank</span>
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                {
                                    locals && locals.map((local, index) => {
                                        return <div key={index} className="rounded-xl bg-white/30 p-5">
                                            <div className="grid grid-cols-5 gap-3 items-center justify-center">
                                                <div className="col-span-5">
                                                    <h3 className="font-bold text-2xl text-center bg-white/50 mb-2 px-2 py-1 rounded-lg">{local.bank}</h3>
                                                </div>
                                                <div className="col-span-2">
                                                    <Image className="w-full h-full object-cover object-center rounded-xl" src={local.logo} width={100} height={100} alt={local.name}></Image>
                                                </div>
                                                <div className="col-span-3 text-center">
                                                    <p className="font-bold text-xl bg-white/50 mb-2 px-2 py-1 rounded-lg break-words">{local.name}</p>
                                                    <p className="font-semibold text-xl bg-white/50 mb-2 px-2 py-1 rounded-lg break-words">{local.number}</p>
                                                    <p className="font-semibold text-medium bg-white/50 mb-2 px-2 py-1 rounded-lg break-words">{local.branch}</p>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    {
                        internationals.length >= 1 && <div>
                            <h3 className="font-bold flex justify-center items-center mb-2 bg-blue-400 p-2 rounded-lg">
                                <i className="bi bi-currency-dollar mr-1 text-lg"></i>
                                <span>International Bank</span>
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                {
                                    internationals && internationals.map((international, index) => {
                                        return <div key={index} className="rounded-xl bg-white/30 p-5">
                                            <div className="grid grid-cols-5 gap-3 items-center justify-center">
                                                <div className="col-span-5">
                                                    <h3 className="font-bold text-2xl text-center bg-white/50 mb-2 px-2 py-1 rounded-lg">{international.bank}</h3>
                                                </div>
                                                <div className="col-span-3 text-center">
                                                    <p className="font-bold text-xl bg-white/50 mb-2 px-2 py-1 rounded-lg break-words">{international.lineOne}</p>
                                                    <p className="font-semibold text-xl bg-white/50 mb-2 px-2 py-1 rounded-lg break-words">{international.lineTwo}</p>
                                                    <p className="font-semibold text-medium bg-white/50 mb-2 px-2 py-1 rounded-lg break-words">{international.lineThree}</p>
                                                </div>
                                                <div className="col-span-2">
                                                    <Image className="w-full h-full object-cover object-center rounded-xl" src={international.logo} width={100} height={100} alt={international.bank}></Image>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                </section> : ""
            }
        </>
    );
}