import Image from "next/image";

export default function File({ plan, profile }: { plan: "FREE" | "PREMIUM" | "BUSINESS"; profile: any }) {
    return (
        <>
            <div className="box mb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Image className="inline-block w-full h-52 md:h-80 rounded-md object-cover object-center" src={profile.cover} width={600} height={200} alt="..." />
                    </div>
                    <div>
                        FN
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <Image className="inline-block w-32 h-32 md:w-52 md:h-52" src={profile.avatar} width={200} height={200} alt="..." />
                    </div>
                    <div>
                        FN
                    </div>
                </div>
            </div>
        </>
    );
}