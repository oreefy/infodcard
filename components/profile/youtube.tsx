import { useEffect, useState } from 'react';
import YouTube from 'react-player';

export default function Youtube({ link }: { link: string }) {
    const [isReady, setIsReady] = useState<boolean>(false);
    useEffect(() => {
        setIsReady(true);
    }, []);
    return (
        <>
            {isReady && link && <section className="box p-2">
                <div className='h-64 overflow-hidden rounded-lg'>
                    <YouTube
                        width="100%"
                        height="100%"
                        url={link}
                        controls={false}
                    />
                </div>
            </section>}
        </>
    );
}