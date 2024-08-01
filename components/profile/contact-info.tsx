export default function Address({ name, phone, profession, email, address }: {
    name: string; phone: string; profession?: string; email: string; address?: string;
}) {
    return (
        <>
            <section className="box">
                <h2 className="font-extrabold p-2 rounded-xl flex items-center">
                    <i className="bi bi-person-lines-fill mr-3 px-3 py-2 rounded-full text-3xl bg-white/50"></i>
                    <span className="text-2xl uppercase">Contact Info</span>
                </h2>
                <div className="mt-2 w-full">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl col-span-2">
                            <h3 className="flex items-center justify-center">
                                <i className="bi bi-person mr-1 text-xl"></i>
                                <span className="font-semibold">Name</span>
                            </h3>
                            <p className="text-lg font-bold break-words text-black text-center">{name}</p>
                        </div>
                        <div className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl">
                            <h3 className="flex items-center justify-center">
                                <i className="bi bi-telephone mr-1 text-xl"></i>
                                <span className="font-semibold text-center">Phone</span>
                            </h3>
                            <p className="text-lg font-bold break-words text-black text-center">{phone}</p>
                        </div>
                        <div className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl">
                            <h3 className="flex items-center justify-center">
                                <i className="bi bi-briefcase mr-1 text-xl"></i>
                                <span className="font-semibold ">Profession</span>
                            </h3>
                            <p className="text-lg font-bold break-words text-black text-center">{profession || "-"}</p>
                        </div>
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
                            address && <div className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl col-span-2">
                                <h3 className="flex items-center">
                                    <i className="bi bi-geo mr-1 text-xl"></i>
                                    <span className="font-semibold">Address</span>
                                </h3>
                                <p className="text-lg font-bold break-words text-black">{address}</p>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    );
}