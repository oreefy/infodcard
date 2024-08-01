import Seo from "@/components/seo";
import Layout from "@/components/account";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Fetch } from "primepack/client";

function WriteMessage({ refresh }: { refresh: () => void }) {
  const [loader, setLoader] = useState<boolean>(false);
  const submit = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    const data = {
      name: event.target.name.value,
      number: event.target.number.value,
      message: event.target.message.value,
    }
    const res = await Fetch("/api/account/message/support/create", {
      method: "POST",
      body: data
    });
    if (res.status === 200) {
      event.target.name.value = "";
      event.target.number.value = "";
      event.target.message.value = "";
      refresh();
      toast.success(res.body.message || "The message has been successfully send.");
    } else {
      toast.error(res.body.message || "Something went wrong.");
    }
    setLoader(false);
  }
  return (
    <div className="box p-0">
      <div className="box rounded-b-none m-0">
        <h1 className="font-bold text-xl">Write Message</h1>
      </div>
      <div className="p-3 md:p-4 lg:p-5">
        <form className="grid grid-cols-2 gap-3" onSubmit={submit}>
          <div>
            <label className="inp-label" htmlFor="name">Full Name</label>
            <input maxLength={100} className="inp-text" type="text" name="name" id="name" placeholder="Enter Your Full Name" required />
          </div>
          <div>
            <label className="inp-label" htmlFor="number">Phone Number</label>
            <input className="inp-text" type="tel" pattern="([0-9 +]){6,14}" name="number" id="number" placeholder="Enter Your Phone Number" required />
          </div>
          <div className="col-span-2">
            <label className="inp-label" htmlFor="message">Message</label>
            <textarea maxLength={500} className="inp-text h-40" id="message" name="message" placeholder="Enter Your Message" required />
          </div>
          <div className="text-center col-span-2">
            {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Submit</button>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Support() {
  const [messages, setMessages] = useState<any>(null);
  const [loader, setLoader] = useState<any>(true);
  const [collapse, setCollapse] = useState<string>("");
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
  const LoadData = async () => {
    setLoader(true);
    const res = await Fetch("/api/account/message/support", { method: "POST" });
    if (res.status === 200) {
      setMessages(res.body.messages);
    } else {
      setMessages(null);
    }
    setLoader(false);
  }
  useEffect(() => { LoadData(); }, [])
  const deleteMessage = async (unique: string) => {
    setDeleteLoader(true);
    const res = await Fetch("/api/account/message/support/delete", { method: "POST", body: { unique: unique } });
    if (res.status === 200) {
      toast.success(res.body.message || "The message has been successfully deleted.")
    } else {
      toast.error(res.body.message || "Something went wrong.")
    }
    setDeleteLoader(false);
    LoadData();
  }
  return (
    <>
      <Seo title="Support" />
      <Layout>
        {loader && <span className='bg-white/50 rounded-xl w-full h-96 inline-block animate-pulse'></span>}
        {!loader && <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <WriteMessage refresh={LoadData} />
          <div>
            <div className="box p-0 mb-0">
              <div className="box rounded-b-none flex gap-3 items-center justify-between m-0">
                <h1 className="font-bold text-xl">Support Messages</h1>
                <button disabled={loader} onClick={() => LoadData()} className="px-4 py-2 bg-white/70 tracking-wide rounded-lg hover:bg-white active:scale-90 duration-200 font-bold" type="button">Refresh</button>
              </div>
              <div className="p-3 md:p-4 lg:p-5 grid grid-cols-1 gap-3">
                {
                  messages.length >= 1 ? messages.map((message: any, index: any) => {
                    return <div className="bg-white/30 rounded-lg overflow-hidden" key={index}>
                      <div onClick={() => collapse === `${index}` ? setCollapse(``) : setCollapse(`${index}`)} className="p-3 bg-white/30 hover:bg-white/50 flex gap-3 items-center justify-between cursor-pointer duration-200">
                        <h3 className="font-semibold text-lg line-clamp-1">{`${message.name}`}{collapse !== `${index}` && <span className="text-slate-600 text-xs">{` - ${message.number} - ${message.message}`}</span>}</h3>
                        {collapse === `${index}` ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}

                      </div>
                      {collapse === `${index}` && <div className="p-3 md:p-4 lg:p-5">
                        <p className="text-xl font-semibold border-b-2 border-slate-400 pb-1 mb-2">{message.number}</p>
                        <p className="text-slate-800">{message.message}</p>
                        <button disabled={deleteLoader} onClick={() => deleteMessage(message.unique)} className="px-4 py-2 tracking-wide active:scale-90 font-bold bg-red-500 hover:bg-red-700 text-white rounded-lg duration-200 text-xs float-right my-3 md:my-4 lg:my-5" type="button">{deleteLoader ? "Wait..." : "Delete"}</button>
                      </div>}
                    </div>
                  }) : <div>
                    <p className="px-3 py-10 text-center">No Messages</p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>}
      </Layout>
    </>
  );
}