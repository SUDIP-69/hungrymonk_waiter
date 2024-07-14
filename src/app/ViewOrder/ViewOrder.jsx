"use client";
import { useEffect, useState } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CreateIcon from "@mui/icons-material/Create";
import logo from "../assets/baksish1.png";
import TimeAgo from "react-timeago";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingPage from "../Components/LoadingPage";
import Link from "next/link";
import { TaskAlt } from "@mui/icons-material";
import noorder from "../assets/noorder.jpg";
import toast, { Toaster } from "react-hot-toast";

function ViewOrder() {
  const router = useRouter();
  const [orders, setOrders] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [servedOrders, setServedOrders] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true); // State to manage loading indicator
  const [error, setError] = useState(null); // State to manage error messages
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const fetchOrders = async () => {
    try {
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        // localStorage is available
        const restaurant_id = localStorage.getItem("restaurant_id");
        const { data } = await axios.post(`/api/fetchAllOrders`, {
          restaurant_id,
        });
        //console.log(data);

        if (data.success) {
          setOrders(data.data);
        } else {
          setOrders([]);
        }
      }
    } catch (error) {
      console.error("Error fetching orders", error);
      setError("Failed to fetch orders. Please try again.");
      setOrders([]);
    } finally {
      setIsLoading(false); // Set loading to false after fetching orders
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      window.location = "/";
    } else {
      fetchOrders();

      const intervalId = setInterval(() => {
        fetchOrders();
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, []);

  const handleToggle = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleClick = (e) => {
    toast.success("Signing out")
    e.preventDefault();
    localStorage.removeItem("accessToken");
    toast.dismiss();
    router.push("/");
  };

  const handleServed = async (orderId) => {
    if(confirm("Are you sure you want to mark this order as served")){
    try {
      const response = await axios.post(`/api/markasserved`, { id: orderId });
      if (response.data.success) {
        toast.success("Marked as served");
        setServedOrders((prev) => new Set(prev).add(orderId));
        setTimeout(() => {
          fetchOrders(); // Fetch updated orders after marking as served
        }, 2000);
        
      } else {
        console.error("Error marking order as served");
      }
    } catch (error) {
      console.error("Error marking order as served", error);
    }}
  };

  const sortedOrders = orders?.sort((a, b) => {
    if (a.order_status === "served" && b.order_status !== "served") return 1;
    if (a.order_status !== "served" && b.order_status === "served") return -1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <><Toaster/>
      <header className="bg-[#4E0433] p-4 text-white poppins-bold tracking-widest text-center text-2xl">
        <div>
          
          <div className="flex justify-between items-center">
            <div
              className="bg-[#FAFAFA] p-2 rounded-lg w-24 shadow-md shadow-[#AFAFAF] cursor-pointer"
              onClick={() => {toast.dismiss();router.push(`/ViewOrder?&id=${id}`)}}
            >
              <Image alt="logo" width={100} height={10000} src={logo} />
            </div>
            <a onClick={handleClick} className="cursor-pointer text-base">
              Signout <ExitToAppIcon />
            </a>
          </div>
        </div>
      </header>
      <div>
        <div className="flex poppins-bold tracking-widest text-2xl justify-center items-center mt-2">
          ORDERS
        </div>
        <hr className="h-[2px] mx-auto bg-[#4E0433] mb-8 rounded-2xl w-32" />
      </div>
      <main className="mb-16">
        {isLoading ? (
          <LoadingPage />
        ) : error ? (
          <div className="flex justify-center items-center text-xl mt-10 text-red-600">
            {error}
          </div>
        ) : sortedOrders && sortedOrders.length > 0 ? (
          sortedOrders.map((tableorder, index) => (
            <div key={index}>
              <div className="relative">
                <div
                  onClick={() =>{toast.dismiss();
                    router.push(
                      `/OrderDetails?order=${tableorder.order_id}&id=${id}`
                    )
                  }}
                  className="mx-2 pb-3 relative rounded-xl bg-[#ffffff] shadow-md hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex justify-between w-full px-5 pt-5 pb-2 text-left text-[#565556] text-xl poppins-semibold ">
                    Table - {tableorder.table_number}
                    <div className="flex items-center">
                      <span
                        className={`rounded-full w-10 h-10 border-[1px] border-black ${
                          tableorder.order_status == "updated"
                            ? "bg-[#e0f903]"
                            : tableorder.order_status == "new"
                            ? "bg-[#0ace55]"
                            : tableorder.order_status == "served"
                            ? "bg-[#1c4dae]"
                            : tableorder.order_status == "waitingforbill"
                            ? "bg-[#c42b2b]"
                            : tableorder.order_status == "billgenerated"
                            ? "bg-gray-600"
                            : "bg-[#ffffff]"
                        } text-white p-2 mr-2`}
                      ></span>
                    </div>
                  </div>
                  <div className="px-5 pb-1 text-lg">
                    Status :{" "}
                    <span className="font-semibold">
                      {tableorder.order_status === "updated"
                        ? "Recently updated"
                        : tableorder.order_status == "new"
                        ? "New order"
                        : tableorder.order_status == "served"
                        ? "Served"
                        : tableorder.order_status == "waitingforbill"
                        ? "Waiting for bill"
                        : tableorder.order_status == "billgenerated"
                        ? "Bill generated"
                        : "in progress"}
                    </span>
                  </div>
                  <div className="px-5 italic">
                    <span>Placed&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                    <TimeAgo
                      className="text-sm poppins-normal font-semibold text-[#661268] italic"
                      date={tableorder.createdAt}
                    />
                  </div>
                  {tableorder.createdAt != tableorder.updatedAt && (
                    <div className="px-5 pb-1 italic">
                      <span>Updated :&nbsp;</span>
                      <TimeAgo
                        className="text-sm poppins-normal font-semibold text-[#661268] italic"
                        date={tableorder.updatedAt}
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleServed(tableorder._id)}
                  className={`z-0 space-x-1 absolute right-2 bottom-1 p-2 py-1 border-2 ${
                    servedOrders.has(tableorder._id) ||
                    tableorder.order_status == "served" ||
                    tableorder.order_status == "billgenerated"
                      ? "bg-green-800"
                      : "bg-blue-500"
                  } shadow-lg poppins-regular text-[0.65rem] rounded-lg text-[#fff9ea] border-white flex justify-center items-center ${
                    servedOrders.has(tableorder._id) ||
                    tableorder.order_status == "served"
                      ? "cursor-default"
                      : "cursor-pointer"
                  }`}
                  disabled={
                    servedOrders.has(tableorder._id) ||
                    tableorder.order_status == "served" ||
                    tableorder.order_status == "billgenerated"
                  }
                >
                  {tableorder.order_status == "served" ||
                  tableorder.order_status == "billgenerated" ? (
                    <>
                      <TaskAlt />
                      <span>Served</span>
                    </>
                  ) : (
                    <>
                      <TaskAlt />
                      <span>Mark as Served</span>
                    </>
                  )}
                </button>
              </div>

              <div className="h-10 flex items-center justify-center">
                <hr className="border-[1px] border-black w-full mx-8 border-dotted" />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center text-xl mt-10">
            <Image alt="No Orders" src={noorder} width={150} height={150} />
            <p>No orders found.</p>
          </div>
        )}
      </main>
      <div className="bg-[#4E0433] fixed bottom-0 w-full p-5 text-white poppins-bold tracking-widest text-center text-2xl">
        <div>
          <Link
            href={`/SearchItems?id=neworder`}
            className="text-lg py-2 z-50 px-4 font-medium rounded-xl text-black bg-[#FFF9EB] hover:bg-[#e0d8c3]"
          >
            <CreateIcon /> Create a new order
          </Link>
        </div>
      </div>
    </>
  );
}

export default ViewOrder;
