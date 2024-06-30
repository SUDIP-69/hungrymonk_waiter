"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import logo from "./assets/baksish1.png";
import Image from "next/image";

export default function Home() {
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");

  const router = useRouter();

  const handlesubmit = async (event) => {
    event.preventDefault();

    // console.log(user, password);

    const {
      data: { success,token },
    } = await axios.post("/api/login", { username: user, password });
    // console.log(success);
    if (success) {
      setpassword("");
      setuser("");
      toast.success("successfully logged in");
      localStorage.setItem('accessToken',token)
      setTimeout(() => {
        router.push("/ViewOrder");
      }, 1000);
    } else {
      setuser("");

      toast.error("successfully failed");
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  };
  return (
    <>
      <Toaster />
      
      <header className="bg-[#4E0433] p-4 text-white font-bold tracking-widest text-center text-2xl">
        <div>
          <div className="flex justify-between items-center bg-[#FAFAFA] p-2 rounded-lg w-24 shadow-md shadow-[#AFAFAF]">
            <Image alt="logo" width={100} height={10000} src={logo} />
          </div>
        </div>
      </header>

      <main>
        <form onSubmit={handlesubmit} className="max-w-xl mx-auto mt-40 p-6">
          
        <div className="flex font-extrabold tracking-widest text-2xl justify-center items-center -mt-10">
          LOGIN
        </div>
        <hr className="h-[2px] mx-auto bg-[#4E0433] mb-10 rounded-2xl w-32" />

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_email"
              value={user}
              onChange={(e) => setuser(e.target.value)}
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4E0433] peer"
              placeholder=" "
              required=""
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#4E0433]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
            value={password}
              type="password"
              name="floating_password"
              onChange={(e) => setpassword(e.target.value)}
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#4E0433] peer"
              placeholder=" "
              required=""
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#4E0433]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-[#4E0433] hover:bg-[#4E0433] focus:ring-4 focus:outline-none focus:ring-[#4E0433] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
