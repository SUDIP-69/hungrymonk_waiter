"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import logo from "../assets/logo.svg";
import Image from "next/image";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Loginpage() {
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const router = useRouter();

  const handlesubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      const {
        data: { success, token, restaurant_id },
      } = await axios.post("/api/login", { username: user, password });

      if (success) {
        localStorage.setItem("restaurant_id", restaurant_id);
        setpassword("");
        setuser("");
        toast.success("Successfully logged in", { id: toastId });
        localStorage.setItem("accessToken", token);
        router.push("/ViewOrder");
      } else {
        toast.error("Failed to login", { id: toastId });
        window.location.reload();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Toaster />
      <main>
        <div className="sm:mx-auto sm:w-full mt-20 sm:max-w-sm">
          <Image
            className="mx-auto h-30 mix-blend-difference"
            src={logo}
            alt="logo"
          />
          <div>
            <p className="uppercase text-[#441029] tracking-wide text-2xl lg:ml-0 -ml-2 -mt-32 mb-20 px-32">
              arabikas
            </p>
          </div>
        </div>
        <div className="flex justify-center mx-auto items-center mt-10 rounded-lg w-24"></div>

        <form className="w-4/5 sm:w-2/5 mx-auto p-6 mt-5 border bg-white bg-opacity-50 rounded-lg drop-shadow-xl">
          <div className="flex text-center text-2xl font-light tracking-tight justify-center items-center">
            Log in to your account
          </div>
          <hr className="h-[2px] mx-auto bg-[#4E0433] mb-10 rounded-2xl w-1/2" />

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
              disabled={isLoading}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-[#4E0433] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={password}
              type={showPassword ? "text" : "password"} // Toggle input type
              name="floating_password"
              onChange={(e) => setpassword(e.target.value)}
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#4E0433] peer"
              placeholder=" "
              required=""
              disabled={isLoading}
            />
            {/* <div className="flex justify-end -mt-6 mr-2 opacity-30 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div> */}
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-[#4E0433] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>

            <p className="mt-10 text-left text-sm text-[#441029] tracking-wider">
              Forgot Password? &nbsp;
              <a
                href="#"
                className="font-semibold underline text-rose-800 tracking-tighter"
              >
                Connect with team
              </a>
            </p>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="text-white mt-3 lg:-mt-10 bg-[#4E0433] hover:bg-[#4E0433] focus:ring-4 focus:outline-none focus:ring-[#4E0433] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default Loginpage;
