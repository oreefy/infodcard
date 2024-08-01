import Fetch from "@/fetch";
import { useState } from "react";

export default function Update({ product, link }: { product: any, link: string }) {
  const [loader, setLoader] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ type: string, success: boolean, message: string }[]>();
  const [data, setData] = useState<any>(product)

  const updateLocalBank = (event: any) => {
    event.preventDefault();
    setErrors([])
    setLoader(true)
    const input: any = {
      link: link,
      unique: product.unique,
      bank: event.target.bank.value || "",
      name: event.target.name.value || "",
      number: event.target.number.value || "",
      branch: event.target.branch.value || "",
    }
    Fetch("/api/account/local-bank/update", { method: "POST", body: input }).then((res) => {
      if (res.status === 200) {
        setErrors(res.body.errors);
      } else {
        setErrors(res.body.errors)
      }
      setLoader(false);
    })
  }
  return (
    <form onSubmit={updateLocalBank}>
      <div>
        <label className="inp-label" htmlFor="bank"><i className="bi bi-star-fill text-red-600"></i> Bank Name</label>
        <input onChange={(e) => setData({ ...data, bank: e.target.value })} value={data.bank} maxLength={100} className="inp-text" type="text" name="bank" placeholder="Enter Your Bank Name" id="bank" required />
        {errors && errors.map((error, index) => { return error.type === "bank" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
      </div>
      <div>
        <label className="inp-label" htmlFor="name"><i className="bi bi-star-fill text-red-600"></i> Account Name</label>
        <input onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} maxLength={70} className="inp-text" type="text" name="name" placeholder="Enter Your Account Name" id="name" required />
        {errors && errors.map((error, index) => { return error.type === "name" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
      </div>
      <div>
        <label className="inp-label" htmlFor="number"><i className="bi bi-star-fill text-red-600"></i> Account Number</label>
        <input className="inp-text" onChange={(e) => setData({ ...data, number: e.target.value })} value={data.number} type="tel" pattern="([0-9 +]){1,30}" name="number" placeholder="Account Number" id="number" required />
        {errors && errors.map((error, index) => { return error.type === "number" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
      </div>
      <div>
        <label className="inp-label" htmlFor="branch"><i className="bi bi-star-fill text-red-600"></i> Branch Name</label>
        <input onChange={(e) => setData({ ...data, branch: e.target.value })} value={data.branch} maxLength={70} className="inp-text" type="text" name="branch" placeholder="Enter Your Branch Name" id="branch" required />
        {errors && errors.map((error, index) => { return error.type === "branch" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
      </div>
      <div className="text-center mt-3">
        {errors && errors.map((error, index) => { return error.type === "other" ? error.success ? <p className="mb-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mb-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
        {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Update</button>}
      </div>
    </form>
  );
}