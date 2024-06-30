"use client";
import React from "react";
import TimeAgo from "react-timeago";
import { useRouter } from "next/navigation";

function DetailedView({ orders }) {

  const router = useRouter();

  
  const handleClick = (e) => {
    e.preventDefault()
    // localStorage.removeItem("accessToken")
    router.push("/OrderDetails")
  }

  return (
    // <div>
    //   {orders[0]?.order_items?.map((items, i) => {
    //     return (
    //       <div
    //         className="max-w-md mx-auto mt-2 p-6    rounded-lg shadow-md"
    //         key={i}
    //       >
    //         <h1 className="text-lg font-bold mb-4 text-[#661268]">
    //           Order Summary
    //         </h1>
    //         <ul className="mb-4">
    //           {items?.items?.map((inneritem, index) => (
    //             <li className="flex justify-between" key={index}>
    //               <span>{inneritem.name}</span>
    //               <span>{inneritem.quantity}</span>
    //             </li>
    //           ))}
    //         </ul>
    //         <textarea
    //           className="w-full p-2 mb-4 border-2 border-[#661268] rounded-lg shadow-lg text-sm"
    //           placeholder="Notes from customer to be kept here that will be conveyed to chef"
    //         />
    //         <div className="flex justify-between">
    //           <button className="bg-amber-500 hover:bg-amber-600 border-2 border-amber-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
    //             Edit Order
    //           </button>
    //           <button className="bg-lime-500 hover:bg-lime-700 text-white border-2 border-lime-600 font-bold py-2 px-4 rounded-lg shadow-lg">
    //             Confirm Order
    //           </button>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
    <div>
      {orders?.map((items, i) => {
        return (
          <div
            className="max-w-md mx-auto mt-2 p-6    rounded-lg shadow-md"
            key={i}
          >
            <h1 className="text-lg font-bold mb-4 text-[#661268]">
              Order Summary
            </h1>
            <ul className="mb-4">
                <li className="flex justify-between" key={i}>
                <span>Order Placed:</span>
                <TimeAgo  className="text-sm font-semibold text-[#661268] italic" date={items.createdAt} />
                </li>
            </ul>
            {/* <textarea
              className="w-full p-2 mb-4 border-2 border-[#661268] rounded-lg shadow-lg text-sm"
              placeholder="Notes from customer to be kept here that will be conveyed to chef"
            /> */}
            <div className="flex justify-between">
              <div className="py-2 flex ">
                <p>Status :</p>
                <p className="px-1 font-semibold">{items.order_items[0].status}</p>
              </div>
              <button onClick={handleClick} className="bg-lime-500 hover:bg-lime-700 text-white border-2 border-lime-600 font-bold py-2 px-4 rounded-lg shadow-lg">
                View Order
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DetailedView;
