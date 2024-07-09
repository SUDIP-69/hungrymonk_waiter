// "use client";
// import { useEffect, useState } from "react";
// import Accordion from "../Components/Accordion";
// import DetailedView from "../Components/DetailedView";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import logo from "../assets/baksish1.png";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import LoadingPage from "../Components/LoadingPage";
// import io from "socket.io-client";

// let socket;

// export default function Home() {
//   const router = useRouter();
//   const [orders, setOrders] = useState(null);
//   const [openAccordion, setOpenAccordion] = useState(null);

//   useEffect(() => {
//     if (!localStorage.getItem("accessToken")) {
//       window.location = "/";
//     } else {
//       fetchInitialOrders();
//       socketInitializer();
//     }

//     return () => {
//       if (socket) {
//         socket.disconnect();
//       }
//     };
//   }, []);

//   const fetchInitialOrders = async () => {
//     const restaurant_id = localStorage.getItem("restaurant_id");
//     try {
//       const { data } = await axios.post(`/api/fetchAllOrders`, { restaurant_id });
//       setOrders(data.data);
//     } catch (error) {
//       console.error("Error fetching initial orders", error);
//     }
//   };

//   const socketInitializer = async () => {
//     await fetch("/api/socket");
//     socket = io();

//     socket.on("connect", () => {
//       console.log("Connected to socket");
//     });

//     socket.on("ordersUpdate", (newOrders) => {
//       console.log("Received new orders:", newOrders); // Debug log
//       setOrders(newOrders);
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from socket");
//     });
//   };

//   const handleToggle = (id) => {
//     setOpenAccordion(openAccordion === id ? null : id);
//   };

//   const handleClick = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("accessToken");
//     router.push("/");
//   };

//   const tableOrders = orders?.reduce((acc, order) => {
//     if (!acc[order.table_number]) {
//       acc[order.table_number] = [];
//     }
//     acc[order.table_number].push(order);
//     return acc;
//   }, {});

//   if (!tableOrders)
//     return (
//       <>
//         <LoadingPage />
//       </>
//     );

//   return (
//     <>
//       <header className="bg-[#4E0433] p-4 text-white poppins-bold tracking-widest text-center text-2xl">
//         <div>
//           <div className="flex justify-between items-center">
//             <div className="bg-[#FAFAFA] p-2 rounded-lg w-24 shadow-md shadow-[#AFAFAF]">
//               <Image alt="logo" width={100} height={10000} src={logo} />
//             </div>
//             <a onClick={handleClick}>
//               <ExitToAppIcon />
//             </a>
//           </div>
//         </div>
//       </header>
//       <div>
//         <div className="flex poppins-bold tracking-widest text-2xl justify-center items-center mt-2">
//           ORDERS
//         </div>
//         <hr className="h-[2px] mx-auto bg-[#4E0433] mb-5 rounded-2xl w-32" />
//       </div>
//       <main>
//         {tableOrders &&
//           Object.keys(tableOrders).map((tableNumber, index) => (
//             <Accordion
//               key={index}
//               title={`Table ${tableNumber}`}
//               onToggle={() => handleToggle(tableNumber)}
//               id={tableNumber}
//               isOpen={openAccordion === tableNumber}
//               status={tableOrders[tableNumber]}
//               item={tableOrders[tableNumber]}
//             >
//               <DetailedView orders={tableOrders[tableNumber]} />
//             </Accordion>
//           ))}
//       </main>
//     </>
//   );
// }

// web socket |^^^^

//plane setinterval|

"use client";
import { useEffect, useState } from "react";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CreateIcon from '@mui/icons-material/Create';
import logo from "../assets/baksish1.png";
import TimeAgo from "react-timeago";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingPage from "../Components/LoadingPage";
import Link from "next/link";

function ViewOrder() {
  const router = useRouter();
  const [orders, setOrders] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);

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

  const fetchOrders = async () => {
    const restaurant_id = localStorage.getItem("restaurant_id");
    try {
      const { data } = await axios.post(`/api/fetchAllOrders`, {
        restaurant_id,
      });
      
      if(data.success){
      setOrders(data.data);}
      else{
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleToggle = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  const sortedOrders = orders?.sort((a, b) => {
    if (a.order_status === "served" && b.order_status !== "served") return 1;
    if (a.order_status !== "served" && b.order_status === "served") return -1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  
  if (!sortedOrders)
    return (
      <>
        <LoadingPage />
      </>
    );

  return (
    <>
      <header className="bg-[#4E0433] p-4 text-white poppins-bold tracking-widest text-center text-2xl">
        <div>
          <div className="flex justify-between items-center">
            <div className="bg-[#FAFAFA] p-2 rounded-lg w-24 shadow-md shadow-[#AFAFAF]"  onClick={()=>router.push('/ViewOrder')}>
              <Image alt="logo" width={100} height={10000} src={logo} />
            </div>
            <a onClick={handleClick}>
              <ExitToAppIcon />
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
      <main>
        {sortedOrders &&
          sortedOrders.map((tableorder, index) => (<div key={index}>
            <div
            onClick={() => router.push(`/OrderDetails?order=${tableorder.order_id}`)}
              className=" mx-2 pb-3 rounded-xl bg-[#ffffff] shadow-md hover:bg-gray-100"
            >
              <div
                className="flex justify-between w-full  px-5 pt-5 pb-2 text-left text-[#565556] text-xl poppins-semibold "
                
              >
                Table - {tableorder.table_number}
                <div className="flex items-center">
                  <span
                    className={`rounded-full border-[1px] border-black ${
                      tableorder.order_status == "updated"
                        ? "bg-[#e0f903]"
                        : tableorder.order_status == "new"
                        ? "bg-[#0ace55]"
                        : tableorder.order_status == "served"
                        ? "bg-[#1c4dae]"
                        : tableorder.order_status == "waitingforbill"
                        ? "bg-[#c42b2b]"
                        :"bg-[#ffffff]"
                    } text-white p-2 mr-2`}
                  >
                  </span>
                </div>
              </div>
              <div className="px-5 pb-1 text-lg">
                Status : {
                      tableorder.order_status === "updated"
                        ? "Recently updated"
                        : tableorder.order_status == "new"
                        ? "New order"
                        : tableorder.order_status == "served"
                        ? "Served"
                        : tableorder.order_status == "waitingforbill"
                        ? "Waiting for bill"
                        :"in progress"
                        
                    }
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
            <div className="h-10 flex items-center justify-center">
            <hr className="border-[1px] border-black w-full mx-8 border-dotted"/>
            </div>
            </div>
          ))}
      </main>
      <div className="bg-[#4E0433] fixed bottom-0 w-full p-5 text-white poppins-bold tracking-widest text-center text-2xl">
        <div>
          <Link href={`/SearchItems?id=neworder`} className="text-lg py-2 px-4 font-medium rounded-xl text-black bg-[#FFF9EB]"><CreateIcon/> Create a new order</Link>
        </div>
      </div>
    </>
  );
}

export default ViewOrder;