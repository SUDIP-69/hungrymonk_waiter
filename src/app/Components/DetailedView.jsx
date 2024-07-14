"use client";
import React from "react";
import TimeAgo from "react-timeago";
import { useRouter } from "next/navigation";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import toast from "react-hot-toast";

function DetailedView({ orders }) {
  // console.log(orders);
  const router = useRouter();

  const handleClick = (ord) => {
    const encodedOrder = encodeURIComponent(JSON.stringify(ord));
    toast.dismiss();
    router.push(`/OrderDetails?order=${encodedOrder}`);
  };

  return (
    <div>
      <Toaster/>
      {orders?.map((items, i) => (
        <div key={i} className="space-y-2 ">
          {items?.order_items?.map((ord, ind) => (
            <div className={`max-w-md mx-auto border-2 border-[#67126839] mt-1 p-1 rounded-lg shadow-md `} key={ind}>
              <h1 className="text-lg poppins-bold mb-4 text-[#661268]">Order Summary</h1>
              <ul className="">
                <li className="flex justify-start items-center space-x-1" key={i}>
                  <span>Order Placed :</span>
                  <TimeAgo
                    className="text-sm poppins-semibold text-[#661268] italic"
                    date={ord.createdAt}
                  />
                </li>
              </ul>
              <div className="flex justify-between items-center space-y-2">
                <div className=" flex justify-center items-center">
                  <p>Status :</p>
                  <p className="px-1 poppins-semibold">{ord.status}</p>
                </div>
                <button
                  onClick={() => handleClick(ord)}
                  className="   poppins-semibold   flex justify-center items-center text-lime-500 "
                >
                  <VisibilityTwoToneIcon/>&nbsp;View Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DetailedView;
