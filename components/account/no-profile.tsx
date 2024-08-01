import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function NoProfile() {
    const router = useRouter();
    return (
        <div className="box mb-0 w-full min-h-96 flex items-center justify-center">
            <div className='w-full max-w-lg text-center md:py-10'>
                <div className='text-center'>
                    <Image className='inline-block' src="/default/no-profile.png" width={200} height={200} alt="Upgrade Image - InfodCard" />
                </div>
                <div className='my-5'>
                    <h1 className='text-3xl font-bold tracking-wide mb-3'>No Profile Found</h1>
                    <p className='text-lg font-semibold'>To access this feature, you need to have a profile. Would you like to create a new profile now?</p>
                </div>
                <div>
                    <Link className='inline-block px-4 py-2 bg-purple-700 hover:bg-purple-800 active:scale-90 duration-200 rounded-lg text-white font-bold' href="/my-account/profile">Yes, Create</Link>
                    <button onClick={() => router.back()} className='inline-block px-4 py-2 active:scale-90 hover:text-purple-900 duration-200 rounded-lg font-bold' type='button'>Go Back</button>
                </div>
            </div>
        </div>
    );
}