export default function Payment({ visible, src }: { visible: boolean; src?: string }) {
    if (visible) {
        return (
            <>
                <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-black/50 flex justify-center items-center">
                    <div className="">
                        <iframe className="w-[550px] h-[600px] rounded-3xl aspect-video" src={src}></iframe>
                    </div>
                </div>
            </>
        );
    }
    return null;
}