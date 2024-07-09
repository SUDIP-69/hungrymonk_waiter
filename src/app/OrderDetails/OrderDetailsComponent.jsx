"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "../assets/baksish1.png";
import Image from "next/image";
import LoadingPage from "../Components/LoadingPage";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Link from "next/link";
import ReceiptLongTwoToneIcon from "@mui/icons-material/ReceiptLongTwoTone";
import toast, { Toaster } from "react-hot-toast";
import TimeAgo from "react-timeago";

function OrderDetailsComponent() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState();
  const [notes, setnotes] = useState("");
  const orderParam = searchParams.get("order");
  const router = useRouter();
  useEffect(() => {
    if (orderParam) {
      const fetchorder = async () => {
        const res = await axios.post("/api/fetchspecificorder", {
          orderId: orderParam,
        });
        console.log(res.data.data);
        setOrderDetails(res.data.data);
      };
      fetchorder();
    }
  }, []);

  const generatebill = async () => {
    const res = await axios.post("/api/generatebillfororder", {
      orderId: orderParam,
    });
    if(res.data.success){
      toast.success("Bill generation message sent.");
      const res = await axios.post("/api/fetchspecificorder", {
        orderId: orderParam,
      });
      console.log(res.data.data);
      if (res.data.success) {
        setOrderDetails(res.data.data);
      }
    } else {
      toast.error("Failed to generate bill");
    }
  };

  if (!orderDetails) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }
  const handleConfirmOrder = async (singleOrderId) => {
    console.log("hi");
    const res = await axios.post("/api/confirmorder", {
      singleOrderId: singleOrderId,
    });
    console.log(res);
    if (res.data.success) {
      toast.success("Order confirmed");
      const res = await axios.post("/api/fetchspecificorder", {
        orderId: orderParam,
      });
      console.log(res.data.data);
      if (res.data.success) {
        setOrderDetails(res.data.data);
      }
    } else {
      toast.error("Failed to confirm order");
    }
    console.log(singleOrderId);
  };

  return (
    <div className="pb-10">
      <header className="bg-[#4E0433] p-4 text-white poppins-bold tracking-widest text-center text-2xl">
        <div>
          <div
            onClick={() => router.push("/ViewOrder")}
            className="flex justify-between items-center bg-[#FAFAFA] p-2 rounded-lg w-24 shadow-md shadow-[#AFAFAF]"
          >
            <Image alt="logo" width={100} height={10000} src={logo} />
          </div>
        </div>
      </header>
      <Toaster />
      <main>
        <div className="flex poppins-bold tracking-widest text-xl justify-center items-center mt-5 text-[#661268]">
          Order Summary
        </div>
        <hr className="h-[2px] mb-6 mx-auto bg-[#4E0433] rounded-2xl w-32" />
        {orderDetails[0] &&
          orderDetails[0].order_items.map((order, i) => (
            <div
              key={i}
              className="max-w-md mx-auto px-6 py-3 mt-4 rounded-lg shadow-md"
            >
              <ul className="mb-4">
                {order.items.map((item, j) => (
                  <li key={j} className="flex justify-between text-black">
                    <span>{item.food.name}&nbsp;</span>
                    <span>&nbsp;x&nbsp;{item.quantity}</span>
                  </li>
                ))}
              </ul>
              {(order.notes.length > 0 || order.status == "Ordered") && (
                <textarea
                  id="notes"
                  name="notes"
                  value={notes == "" ? order.notes : notes}
                  onChange={(e) => {
                    // setnotes(e.target.value);
                  }}
                  readOnly={order.status == "Ordered" ? false : true}
                  className="w-full p-2 border-2 border-[#661268] rounded-lg shadow-lg text-sm"
                  placeholder="Notes from customer to be kept here that will be conveyed to chef"
                />
              )}
              <div className=" italic text-right">
                <span>Placed&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                <TimeAgo
                  className="text-sm poppins-normal font-semibold text-[#661268] italic"
                  date={order.updatedAt}
                />
              </div>
              {order.status == "Ordered" && (
                <div className="flex justify-between my-3">
                  <button className="bg-[#5F2216]  text-white poppins-bold py-2 px-4 rounded-lg shadow-lg">
                    <EditIcon /> Edit Order
                  </button>
                  <button
                    className="bg-emerald-700  text-white  poppins-bold py-2 px-4 rounded-lg shadow-lg"
                    onClick={() => {
                      handleConfirmOrder(order._id);
                    }}
                  >
                    <ThumbUpAltIcon />
                    &nbsp;Confirm Order
                  </button>
                </div>
              )}
            </div>
          ))}
        <div className="mt-8 mb-6">
          <Link
            href={`/SearchItems?id=${orderDetails[0].order_id}&order=${orderParam}`}
            className="mx-auto"
          >
            <button className=" mx-auto p-2 border-2 text-lg border-[#661268] shadow-lg poppins-semibold rounded-lg text-black flex justify-center items-center ">
              <AddCircleOutlineIcon />
              <span>Add New Items</span>
            </button>
          </Link>
        </div>

        {orderDetails[0].order_items[orderDetails[0].order_items.length - 1]
          .status != "Ordered"&& (
            <div>
          {orderDetails[0].order_status!="waitingforbill" &&<div className="mb-8">
            <button
              onClick={generatebill}
              className=" border-2 border-[#661268]  text-lg mx-auto px-5 shadow-lg p-2 mt-2 poppins-semibold rounded-lg text-black flex justify-center items-center "
            >
              <DescriptionIcon />
              &nbsp;Generate Bill
            </button>
          </div>}
          {orderDetails[0].order_status=="waitingforbill" &&<div className="mb-8 text-center mx-4 text-lg font-semibold text-[#661268]">
            <p>Bill generation notification has been sent. Please get the bill from the reception.</p>
          </div>}
          </div>
        )}
      </main>
    </div>
  );
}

export default OrderDetailsComponent;
