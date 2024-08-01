import Fetch from "@/fetch";
import { useState } from "react";

export default function Update({ service, link }: { service: any, link: string }) {
  const [loader, setLoader] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ type: string, success: boolean, message: string }[]>();
  const [data, setData] = useState<any>(service)

  const updateService = (event: any) => {
    event.preventDefault();
    setErrors([])
    setLoader(true)
    const input: any = {
      link: link,
      unique: service.unique,
      title: event.target.title.value || "",
      message: event.target.message.value || "",
      price: event.target.price.value || "",
    }
    Fetch("/api/account/service/update", { method: "POST", body: input }).then((res) => {
      if (res.status === 200) {
        setErrors(res.body.errors)
      } else {
        setErrors(res.body.errors)
      }
      setLoader(false)
    })
  }
  return (
    <form onSubmit={updateService}>
      <div>
        <label className="inp-label" htmlFor="title"><i className="bi bi-star-fill text-red-600"></i> Product Title</label>
        <input onChange={(e) => setData({ ...data, title: e.target.value })} value={data.title} maxLength={70} className="inp-text" type="text" name="title" placeholder="Product Title" id="title" required />
        {errors && errors.map((error, index) => { return error.type === "title" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
      </div>
      <div>
        <label className="inp-label" htmlFor="message">Description</label>
        <input onChange={(e) => setData({ ...data, message: e.target.value })} value={data.message} maxLength={150} className="inp-text" type="text" name="message" id="message" placeholder="Product Description" />
        {errors && errors.map((error, index) => { return error.type === "message" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
      </div>
      <div>
        <label className="inp-label" htmlFor="price">Price / Button</label>
        <input onChange={(e) => setData({ ...data, price: e.target.value })} value={data.price} maxLength={20} className="inp-text" type="text" name="price" id="price" placeholder="Product Price" />
        {errors && errors.map((error, index) => { return error.type === "price" ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
      </div>
      <div className="text-center mt-3">
        {errors && errors.map((error, index) => { return error.type === "other" ? error.success ? <p className="mb-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mb-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
        {loader ? <span className="w-28 px-10 py-2 bg-white/50 animate-pulse rounded-full">Wait...</span> : <button className="py-2 px-10 cursor-pointer active:scale-75 hover:px-16 duration-200 bg-green-600 hover:bg-green-900 rounded-full text-white font-bold disabled:bg-slate-700 disabled:hover:px-10 disabled:cursor-not-allowed" type="submit">Update</button>}
      </div>
    </form>
  );
}