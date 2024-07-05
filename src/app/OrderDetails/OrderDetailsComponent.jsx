"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import logo from '../assets/baksish1.png';
import Image from "next/image";
import LoadingPage from "../Components/LoadingPage";
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from "next/link";
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';


function OrderDetailsComponent() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const updateOrderStatus = async (orderId, singleOrderId, newStatus) => {
    try {
      const response = await axios.put('/api/confirmorder', {
        orderId,
        singleOrderId,
        newStatus,
      });
  
      if (response.data.success) {
       // console.log('Order status updated successfully:', response.data.data);
      } else {
        console.error('Failed to update order status:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    const orderParam = searchParams.get("order");
    if (orderParam) {
      const decodedOrder = JSON.parse(decodeURIComponent(orderParam));
      setOrderDetails(decodedOrder);
      
      if(decodedOrder.status ==='Confirmed') {
        //console.log('Order status updated successfully')
        setOrderConfirmed(true);
      }
      //console.log(decodedOrder);
    }
  }, [searchParams]);

  if (!orderDetails) {
    return <div><LoadingPage/></div>;
  }
  const handleConfirmOrder = () => {
    updateOrderStatus("sjhd",orderDetails._id,"Confirmed");
    setOrderConfirmed(true);
  };

  return (
    <>
      <header className="bg-[#4E0433] p-4 text-white poppins-bold tracking-widest text-center text-2xl">
        <div>
          <div className="flex justify-between items-center bg-[#FAFAFA] p-2 rounded-lg w-24 shadow-md shadow-[#AFAFAF]">
            <Image alt="logo" width={100} height={10000} src={logo} />
          </div>
        </div>
      </header>
      <main>
        <div className="flex poppins-bold tracking-widest text-xl justify-center items-center mt-5 text-[#661268]">
          Order Summary
        </div>
        <hr className="h-[2px] mx-auto bg-[#4E0433] mb-10 rounded-2xl w-32" />
        <div className="max-w-md mx-auto p-6 -mt-10 rounded-lg shadow-md">
          <ul className="mb-4">
            
            {orderDetails && orderDetails?.items?.map((item,i)=><li key={i} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
            </li>)}
          </ul>
          <textarea
            id="notes"
            name="notes"
            className="w-full p-2 mb-4 border-2 border-[#661268] rounded-lg shadow-lg text-sm"
            placeholder="Notes from customer to be kept here that will be conveyed to chef"
          />
          {!orderConfirmed && (
            <div className="flex justify-between">
              <button className="bg-amber-500 hover:bg-amber-600 border-2 border-amber-600 text-white poppins-bold py-2 px-4 rounded-lg shadow-lg">
                Edit Order
              </button>
              <button
                className="bg-lime-500 hover:bg-lime-700 text-white border-2 border-lime-600 poppins-bold py-2 px-4 rounded-lg shadow-lg"
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>

        {orderConfirmed && (
          <div className="grid mt-4 grid-rows-2 ">
            <Link href={`/SearchItems?id=${orderDetails._id}`} className="mx-auto"  >
            <button className="bg-orange-500 mx-auto p-2 poppins-semibold rounded-lg text-[#f9fae0] flex justify-center items-center space-x-1">
              <AddCircleOutlineIcon  /><span>Add New Items</span></button>
            </Link>
            <button className=" bg-emerald-500 mx-auto p-2 mt-2 poppins-semibold rounded-lg text-[#f9fae0] flex justify-center items-center space-x-1">
              <ReceiptLongTwoToneIcon/>Generate Bill
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default OrderDetailsComponent;
