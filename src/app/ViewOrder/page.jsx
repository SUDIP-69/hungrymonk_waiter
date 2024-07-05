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
import Accordion from "../Components/Accordion";
import DetailedView from "../Components/DetailedView";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../assets/baksish1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingPage from "../Components/LoadingPage";

export default function Home() {
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
      }, 5000); // Polling every 5 seconds

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const fetchOrders = async () => {
    const restaurant_id = localStorage.getItem("restaurant_id");
    try {
      const { data } = await axios.post(`/api/fetchAllOrders`, {
        restaurant_id,
      });
      setOrders(data.data);
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

  const tableOrders = orders?.reduce((acc, order) => {
    if (!acc[order.table_number]) {
      acc[order.table_number] = [];
    }
    acc[order.table_number].push(order);
    return acc;
  }, {});

  if (!tableOrders)
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
            <div className="bg-[#FAFAFA] p-2 rounded-lg w-24 shadow-md shadow-[#AFAFAF]">
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
        <hr className="h-[2px] mx-auto bg-[#4E0433] mb-5 rounded-2xl w-32" />
      </div>
      <main>
        {tableOrders &&
          Object.keys(tableOrders).map((tableNumber, index) => (
            <Accordion
              key={index}
              title={`Table ${tableNumber}`}
              onToggle={() => handleToggle(tableNumber)}
              id={tableNumber}
              isOpen={openAccordion === tableNumber}
              status={tableOrders[tableNumber][0]['order_status']}
              item={tableOrders[tableNumber]}
            >
              <DetailedView orders={tableOrders[tableNumber]} />
            </Accordion>
          ))}
      </main>
    </>
  );
}