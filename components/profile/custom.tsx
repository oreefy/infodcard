export default function Custom({ group, groups }: { group: string, groups: { title: string, value: string }[] }) {
    return (
        <>
            {
                group && <section className="box">
                    <h2 className="font-extrabold p-2 rounded-xl flex items-center">
                        <i className="bi bi-gem mr-3 px-3 py-2 rounded-full text-3xl bg-white/50"></i>
                        <span className="text-2xl uppercase">{group !== "" ? group : "Unknown"}</span>
                    </h2>
                    <div className="mt-2 w-full">
                        <div className="grid grid-cols-1 gap-3">
                            {
                                groups.map((group, index) => {
                                    return group.title !== "" && group.value !== "" && <div key={index} className="bg-white/30 hover:bg-white/50 duration-200 p-3 rounded-xl grid grid-cols-3">
                                        <div className="col-span-1 border-r-2 border-slate-400 flex items-center">
                                            <h3 className="flex items-center justify-start pr-2">
                                                <span className="font-bold">{group.title !== "" ? group.title : "Unknown"}</span>
                                            </h3>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-base font-semibold break-words text-black pl-2">{group.value !== "" ? group.value : "Unknown"}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </section>
            }
        </>
    );
}
