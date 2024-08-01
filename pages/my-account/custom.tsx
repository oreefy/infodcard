import Layout from '@/components/account'
import Seo from '@/components/seo';
import { useSession } from 'next-auth/react';
import Upgrade from '@/components/account/upgrade';
import { useEffect, useState } from 'react';
import Fetch from '@/fetch';
import NoProfile from '@/components/account/no-profile';
import { toast } from 'react-toastify';

export default function Custom() {
    const { data: session } = useSession();
    const [profiles, setProfiles] = useState<any>([]);
    const [profile, setProfile] = useState<any>({});
    const [select, setSelect] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(true);
    const [group, setGroup] = useState<string>("");
    const [oneName, setOneName] = useState<any>(null);
    const [oneValue, setOneValue] = useState<any>(null);
    const [twoName, setTwoName] = useState<any>(null);
    const [twoValue, setTwoValue] = useState<any>(null);
    const [threeName, setThreeName] = useState<any>(null);
    const [threeValue, setThreeValue] = useState<any>(null);
    const [fourName, setFourName] = useState<any>(null);
    const [fourValue, setFourValue] = useState<any>(null);
    const [fiveName, setFiveName] = useState<any>(null);
    const [fiveValue, setFiveValue] = useState<any>(null);
    const [sixName, setSixName] = useState<any>(null);
    const [sixValue, setSixValue] = useState<any>(null);
    const [sevenName, setSevenName] = useState<any>(null);
    const [sevenValue, setSevenValue] = useState<any>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [invalid, setInvalid] = useState<boolean>(false);
    const serverLoad = () => {
        Fetch("/api/account/profile/views", { method: "POST" }).then((res) => {
            if (res.body.profiles?.length) {
                setProfiles(res.body.profiles);
                setGroup(res.body.profiles[0].groupName);
                setSelect(res.body.profiles[0].link);
                setProfile(res.body.profiles[0]);
                setOneName(res.body.profiles[0].groupItems[0]?.title);
                setOneValue(res.body.profiles[0].groupItems[0]?.value);
                setTwoName(res.body.profiles[0].groupItems[1]?.title);
                setTwoValue(res.body.profiles[0].groupItems[1]?.value);
                setThreeName(res.body.profiles[0].groupItems[2]?.title);
                setThreeValue(res.body.profiles[0].groupItems[2]?.value);
                setFourName(res.body.profiles[0].groupItems[3]?.title);
                setFourValue(res.body.profiles[0].groupItems[3]?.value);
                setFiveName(res.body.profiles[0].groupItems[4]?.title);
                setFiveValue(res.body.profiles[0].groupItems[4]?.value);
                setSixName(res.body.profiles[0].groupItems[5]?.title);
                setSixValue(res.body.profiles[0].groupItems[5]?.value);
                setSevenName(res.body.profiles[0].groupItems[6]?.title);
                setSevenValue(res.body.profiles[0].groupItems[6]?.value);
                setLoader(false);
                setSuccess(null);
            } else {
                setInvalid(true);
                setLoader(false);
                setSuccess(null);
            }
        })
    }
    useEffect(() => {
        serverLoad();
    }, []);
    useEffect(() => {
        if (profiles.length) {
            const find: any = profiles.find((profile: any) => profile.link === select);
            setGroup(find?.groupName || "");
            setSelect(find?.link);
            setProfile(find);
            setOneName(find?.groupItems[0]?.title || "");
            setOneValue(find?.groupItems[0]?.value || "");
            setTwoName(find?.groupItems[1]?.title || "");
            setTwoValue(find?.groupItems[1]?.value || "");
            setThreeName(find?.groupItems[2]?.title || "");
            setThreeValue(find?.groupItems[2]?.value || "");
            setFourName(find?.groupItems[3]?.title || "");
            setFourValue(find?.groupItems[3]?.value || "");
            setFiveName(find?.groupItems[4]?.title || "");
            setFiveValue(find?.groupItems[4]?.value || "");
            setSixName(find?.groupItems[5]?.title || "");
            setSixValue(find?.groupItems[5]?.value || "");
            setSevenName(find?.groupItems[6]?.title || "");
            setSevenValue(find?.groupItems[6]?.value || "");
        }
    }, [select, profiles]);
    const update = (event: any) => {
        event.preventDefault();
        setLoader(true);
        setSuccess(null);
        const body = {
            profile: select,
            group: group,
            itemOne: { unique: profile.groupItems[0]?.unique, title: oneName || "", value: oneValue || "", },
            itemTwo: { unique: profile.groupItems[1]?.unique, title: twoName || "", value: twoValue || "", },
            itemThree: { unique: profile.groupItems[2]?.unique, title: threeName || "", value: threeValue || "", },
            itemFour: { unique: profile.groupItems[3]?.unique, title: fourName || "", value: fourValue || "", },
            itemFive: { unique: profile.groupItems[4]?.unique, title: fiveName || "", value: fiveValue || "", },
            itemSix: { unique: profile.groupItems[5]?.unique, title: sixName || "", value: sixValue || "", },
            itemSeven: { unique: profile.groupItems[6]?.unique, title: sevenName || "", value: sevenValue || "", },
        }
        Fetch("/api/account/custom", { method: "POST", body: body }).then((res) => {
            if (res.status === 200) {
                serverLoad();
                setSuccess(res.body.message);
                toast.success(res.body.message || "The custom fields has been successfully updated.");
            } else {
                toast.error(res.body.message || "Something went wrong.");
                setLoader(false);
                setSuccess(null);
            }
        })
    }
    return (
        <>
            <Seo title='Custom Fields' />
            <Layout>
                {!loader && session?.user?.name !== "FREE" && !profiles.length && <NoProfile />}
                {loader && session && <span className='bg-white/50 rounded-xl w-full h-96 inline-block animate-pulse'></span>}
                {!loader && session?.user?.name === "FREE" && <Upgrade />}
                {!loader && session?.user?.name !== "FREE" && profiles.length && <>
                    <form onSubmit={update}>
                        <div className="box p-0 mb-0">
                            <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                                <h1 className="text-center font-bold text-xl ">Custom Fields</h1>
                            </div>
                            <div className="p-3 md:p-4">
                                {profiles.length >= 2 && <div className='mb-5'>
                                    <select title='Select Profile' name='profile' className='w-full h-10 bg-white hover:bg-slate-100 py-2 px-3 outline-none duration-200 rounded-lg font-bold disabled:bg-slate-100 disabled:text-slate-600' onChange={(e) => setSelect(e.target.value)} value={select}>
                                        {profiles.map((profile: any, index: any) => {
                                            return <option key={index} value={profile.link}>{profile.name}</option>
                                        })}
                                    </select>
                                </div>}
                                <div>
                                    <input className='inp-text mb-5 h-16' onChange={(e) => setGroup(e.target.value)} value={group} name='group' type="text" id='group' placeholder="Enter Your Group Name" />
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className='col-span-2'>
                                            <input className='inp-text mb-2' name='oneTitle' type="text" placeholder="1 Field Name" onChange={(e) => setOneName(e.target.value)} value={oneName} />
                                        </div>
                                        <div className='col-span-3'>
                                            <input className='inp-text' name='oneValue' type="text" placeholder="Field Text" onChange={(e) => setOneValue(e.target.value)} value={oneValue} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className='col-span-2'>
                                            <input className='inp-text mb-2' name='twoTitle' type="text" placeholder="2 Field Name" onChange={(e) => setTwoName(e.target.value)} value={twoName} />
                                        </div>
                                        <div className='col-span-3'>
                                            <input className='inp-text' name='twoValue' type="text" placeholder="Field Text" onChange={(e) => setTwoValue(e.target.value)} value={twoValue} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className='col-span-2'>
                                            <input className='inp-text mb-2' name='threeTitle' type="text" placeholder="3 Field Name" onChange={(e) => setThreeName(e.target.value)} value={threeName} />
                                        </div>
                                        <div className='col-span-3'>
                                            <input className='inp-text' name='threeValue' type="text" placeholder="Field Text" onChange={(e) => setThreeValue(e.target.value)} value={threeValue} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className='col-span-2'>
                                            <input className='inp-text mb-2' name='fourTitle' type="text" placeholder="4 Field Name" onChange={(e) => setFourName(e.target.value)} value={fourName} />
                                        </div>
                                        <div className='col-span-3'>
                                            <input className='inp-text' name='fourValue' type="text" placeholder="Field Text" onChange={(e) => setFourValue(e.target.value)} value={fourValue} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className='col-span-2'>
                                            <input className='inp-text mb-2' name='fiveTitle' type="text" placeholder="5 Field Name" onChange={(e) => setFiveName(e.target.value)} value={fiveName} />
                                        </div>
                                        <div className='col-span-3'>
                                            <input className='inp-text' name='fiveValue' type="text" placeholder="Field Text" onChange={(e) => setFiveValue(e.target.value)} value={fiveValue} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className='col-span-2'>
                                            <input className='inp-text mb-2' name='sixTitle' type="text" placeholder="6 Field Name" onChange={(e) => setSixName(e.target.value)} value={sixName} />
                                        </div>
                                        <div className='col-span-3'>
                                            <input className='inp-text' name='sixValue' type="text" placeholder="Field Text" onChange={(e) => setSixValue(e.target.value)} value={sixValue} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className='col-span-2'>
                                            <input className='inp-text mb-2' name='sevenTitle' type="text" id='name' placeholder="7 Field Name" onChange={(e) => setSevenName(e.target.value)} value={sevenName} />
                                        </div>
                                        <div className='col-span-3'>
                                            <input className='inp-text' name='sevenValue' type="text" id='value' placeholder="Field Text" onChange={(e) => setSevenValue(e.target.value)} value={sevenValue} />
                                        </div>
                                    </div>
                                    <div className='col-span-5 text-center mt-2'>
                                        {success && <p className='text-center px-2 pb-2 font-bold text-green-800'>{success}</p>}
                                        <button className='bg-green-700 text-white px-5 py-2 rounded-xl active:scale-90 duration-100 font-bold' type='submit'>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </>}
            </Layout>
        </>

    );
}