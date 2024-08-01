export default function Address({ designation, phone, company, email, website, corporate, branch }: {
    designation?: string; phone?: string; company?: string; email?: string; website?: string; corporate?: string; branch?: string
}) {
    return (
        <>
            {
                designation || phone || company || email || website || corporate || branch ? <section className="box">
                    <h2 className="font-extrabold p-2 rounded-xl flex items-center">
                        <i className="bi bi-briefcase mr-3 px-3 py-2 rounded-full text-3xl bg-white/50"></i>
                        <span className="text-2xl uppercase">Company Info</span>
                    </h2>
                    <div className="mt-2 w-full">
                        <div className="grid grid-cols-2 gap-2">
                            {
                                company && <div className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl col-span-2">
                                    <h3 className="flex items-center justify-center">
                                        <span className="font-bold text-3xl">{company}</span>
                                    </h3>
                                </div>
                            }
                            {
                                phone && <div className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl">
                                    <h3 className="flex items-center justify-center">
                                        <i className="bi bi-telephone mr-1 text-xl"></i>
                                        <span className="font-semibold text-center">Phone</span>
                                    </h3>
                                    <p className="text-lg font-bold break-words text-black text-center">{phone}</p>
                                </div>
                            }
                            {
                                designation && <div className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl">
                                    <h3 className="flex items-center justify-center">
                                        <i className="bi bi-briefcase mr-1 text-xl"></i>
                                        <span className="font-semibold ">Designation</span>
                                    </h3>
                                    <p className="text-lg font-bold break-words text-black text-center">{designation || "-"}</p>
                                </div>
                            }
                            {
                                email && <div className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl col-span-2">
                                    <h3 className="flex items-center">
                                        <i className="bi bi-envelope mr-1 text-xl"></i>
                                        <span className="font-semibold">Email</span>
                                    </h3>
                                    <p className="text-lg font-bold break-words text-black">{email}</p>
                                </div>
                            }
                            {
                                website && <div className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl col-span-2">
                                    <h3 className="flex items-center">
                                        <i className="bi bi-globe mr-1 text-xl"></i>
                                        <span className="font-semibold">Website</span>
                                    </h3>
                                    <p className="text-lg font-bold break-words text-black">{website}</p>
                                </div>
                            }
                            {
                                corporate && <div className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl col-span-2">
                                    <h3 className="flex items-center">
                                        <i className="bi bi-geo mr-1 text-xl"></i>
                                        <span className="font-semibold">Office Address</span>
                                    </h3>
                                    <p className="text-lg font-bold break-words text-black">{corporate}</p>
                                </div>
                            }
                            {
                                branch && <div className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl col-span-2">
                                    <h3 className="flex items-center">
                                        <i className="bi bi-geo mr-1 text-xl"></i>
                                        <span className="font-semibold">Branch Address</span>
                                    </h3>
                                    <p className="text-lg font-bold break-words text-black">{branch}</p>
                                </div>
                            }
                        </div>
                    </div>
                </section> : ""
            }
        </>
    );
}