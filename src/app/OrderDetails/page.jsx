"use client";
import React, { useState } from "react";
import logo from "../assets/baksish1.png";
import Image from "next/image";

function DetailedView() {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
  };

  return (
    <>
      <header className="bg-[#4E0433] p-4 text-white font-bold tracking-widest text-center text-2xl">
        <div>
          <div className="flex justify-between items-center bg-[#FAFAFA] p-2 rounded-lg w-24 shadow-md shadow-[#AFAFAF]">
            <Image alt="logo" width={100} height={10000} src={logo} />
          </div>
        </div>
      </header>
      <main>
        <div className="flex font-bold tracking-widest text-xl justify-center items-center mt-5 text-[#661268]">
          Order Summary
        </div>
        <hr className="h-[2px] mx-auto bg-[#4E0433] mb-10 rounded-2xl w-32" />
        <div className="max-w-md mx-auto p-6 -mt-10 rounded-lg shadow-md">
          <ul className="mb-4">
            <li className="flex justify-between">
              <span>Butter Chicken</span>
              <span>2</span>
            </li>
            <li className="flex justify-between">
              <span>Roti</span>
              <span>4</span>
            </li>
          </ul>
          <textarea
            className="w-full p-2 mb-4 border-2 border-[#661268] rounded-lg shadow-lg text-sm"
            placeholder="Notes from customer to be kept here that will be conveyed to chef"
          />
          {!orderConfirmed && (
            <div className="flex justify-between">
              <button className="bg-amber-500 hover:bg-amber-600 border-2 border-amber-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
                Edit Order
              </button>
              <button
                className="bg-lime-500 hover:bg-lime-700 text-white border-2 border-lime-600 font-bold py-2 px-4 rounded-lg shadow-lg"
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>

        {orderConfirmed && (
          <div className="grid mt-4 grid-rows-2 ">
            <button className="w-1/2 mx-auto bg-amber-500 hover:bg-amber-700 text-white border-2 border-amber-600 mb-2 font-bold py-1 px-4 rounded-lg shadow-lg">
              Add New Items
            </button>
            <button className="w-1/2 mx-auto bg-rose-500 hover:bg-rose-700 text-white border-2 border-rose-600 mt-2  font-bold py-3 px-4 rounded-lg shadow-lg">
              Generate Bill
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default DetailedView;
