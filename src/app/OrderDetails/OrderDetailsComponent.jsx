"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "../assets/baksish1.png";
import Image from "next/image";
import LoadingPage from "../Components/LoadingPage";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import TimeAgo from "react-timeago";
import {
  AddCircle,
  ArrowBackIosNew,
  DeleteForeverRounded,
  RemoveCircle,
  Undo,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

function OrderDetailsComponent() {
  
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState();
  const [notes, setNotes] = useState("");
  const orderParam = searchParams.get("order");
  const restaurant_id = searchParams.get("id");
  const router = useRouter();
  const [updatedQty, setUpdatedQty] = useState({});
  const [deleteitems, setDeleteItems] = useState([]);
  const [deletedItem, setDeletedItem] = useState(null);
  const [cgst, setcgst] = useState("");
  const [sgst, setsgst] = useState("");
  
  useEffect(() => {
    const token=localStorage.getItem("accessToken");
    if (orderParam && restaurant_id && token) {
      const fetchOrder = async () => {
        const res = await axios.post("/api/fetchspecificorder", {
          orderId: orderParam,
        });
        setOrderDetails(res.data.data);
        const response = await axios.post("/api/fetchmenubyrestid", {
          restaurant_id,
        });
        setcgst(response.data.data.cgst);
        setsgst(response.data.data.sgst);
      };
      fetchOrder();
    }
    else{
      router.push("/");
    }
  }, []);

  const generateBill = async () => {
    const res = await axios.post("/api/generatebillfororder", {
      orderId: orderParam,
    });
    if (res.data.success) {
      toast.success("Bill generation message sent.");
      const res = await axios.post("/api/fetchspecificorder", {
        orderId: orderParam,
      });
      if (res.data.success) {
        setOrderDetails(res.data.data);
      }
    } else {
      toast.error("Failed to generate bill");
    }
  };

  const handleUpdateAdd = (id, quantity) => {
    setUpdatedQty((prevState) => {
      const newQty = prevState[id] ? prevState[id] + 1 : parseInt(quantity) + 1;
      return { ...prevState, [id]: newQty };
    });
  };

  const handleUpdateremove = (id, quantity) => {
    setUpdatedQty((prevState) => {
      const currentQty = prevState[id] ? prevState[id] : parseInt(quantity);
      const newQty = currentQty > 0 ? currentQty - 1 : 0;
      return { ...prevState, [id]: newQty };
    });
  };

  const handleDeleteItem = (id) => {
    if (!deleteitems.includes(id)) {
      setDeleteItems([...deleteitems, id]);
      // Store the deleted item temporarily for undo option
      setDeletedItem(id);
    }
  };

  const handleUndoDelete = (id) => {
    setDeleteItems(deleteitems.filter((itemId) => itemId !== id));
    setDeletedItem(null); // Clear deleted item state
  };

  const handleConfirmOrder = async (singleOrderId) => {
    toast.loading("Confirming order");
    if (updatedQty) {
      await axios.post("/api/updatequantity", { updatedQty });
    }
    if (deleteitems.length > 0) {
      await axios.post("/api/deleteitems", { deleteitems });
    }

    const res = await axios.post("/api/confirmorder", {
      singleOrderId: singleOrderId,
    });

    if (res.data.success) {
      const updateres = await axios.post("/api/updatetaxandquantity", {
        orderId: orderParam,
        cgst: cgst,
        sgst: sgst,
      });
      if (updateres.data.success) {
        toast.dismiss();
        toast.success("Order confirmed");
        const res = await axios.post("/api/fetchspecificorder", {
          orderId: orderParam,
        });
        if (res.data.success) {
          setOrderDetails(res.data.data);
        }
      } else {
        toast.dismiss();
        toast.error("Failed to confirm order");
      }
    } else {
      toast.dismiss();
      toast.error("Failed to confirm order");
    }
  };

  if (!orderDetails) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="pb-10">
      <header className="bg-[#4E0433] py-4 text-white poppins-bold tracking-widest text-center text-2xl">
        <div className="flex justify-between px-2 items-center">
          <div
            onClick={() => router.push(`/ViewOrder?id=${restaurant_id}`)}
            className="cursor-pointer flex justify-between items-center p-2 text-base"
          >
            <ArrowBackIosNew />
            Go Back
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
            <div key={i}>{parseFloat(order.items[0].quantity)>0 && <div
              
              className="max-w-md mx-auto px-4 py-3 mt-4 rounded-lg shadow-md"
            >
              <ul className="mb-4 ">
                {order.items.map((item, j) => (
                  <li
                    key={j}
                    className={`flex justify-between text-black ${
                      deleteitems.includes(item._id) ? "line-through" : ""
                    }`}
                  >
                    <span>{item.food.name}&nbsp;</span>
                    <span>
                      <span className="space-x-2">
                        {order.status === "Ordered" &&
                          !deleteitems.includes(item._id) && (
                            <span className="text-[#441029]">
                              <RemoveCircle
                                onClick={() =>
                                  handleUpdateremove(item._id, item.quantity)
                                }
                              />
                            </span>
                          )}
                        <span className="w-[10px]">
                          x {updatedQty[item._id] ?? item.quantity}
                        </span>
                        {order.status === "Ordered" &&
                          !deleteitems.includes(item._id) && (
                            <span className="text-[#441029]">
                              <AddCircle
                                onClick={() => {
                                  handleUpdateAdd(item._id, item.quantity);
                                }}
                              />
                            </span>
                          )}
                      </span>
                      {order.status === "Ordered" && (
                        <span className="text-[#e73336] mx-2">
                          {deletedItem === item._id ? (
                            <Tooltip title="Undo delete">
                              <Undo
                                onClick={() => {
                                  handleUndoDelete(item._id);
                                }}
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Delete item">
                              <DeleteForeverRounded
                                onClick={() => {
                                  handleDeleteItem(item._id);
                                }}
                              />
                            </Tooltip>
                          )}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              {(order.notes.length > 0 || order.status === "Ordered") && (
                <textarea
                  id="notes"
                  name="notes"
                  value={notes === "" ? order.notes : notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                  }}
                  readOnly={order.status === "Ordered" ? false : true}
                  className="w-full p-2 border-2 border-[#661268] rounded-lg shadow-lg text-sm"
                  placeholder="Notes from customer to be kept here that will be conveyed to chef"
                />
              )}
              <div className="italic text-right">
                <span>Placed&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                <TimeAgo
                  className="text-sm poppins-normal font-semibold text-[#661268] italic"
                  date={order.updatedAt}
                />
              </div>
              {order.status === "Ordered" && (
                <div className="flex justify-center my-3">
                  <button
                    className="bg-emerald-700 text-white poppins-bold py-2 px-4 rounded-lg shadow-lg"
                    onClick={() => {
                      handleConfirmOrder(order._id);
                    }}
                  >
                    <ThumbUpAltIcon />
                    &nbsp;Confirm Order
                  </button>
                </div>
              )}
            </div>}</div>
          ))}
        <div className="mt-8 space-x-1 mb-6">
          <Link
            href={`/SearchItems?order=${orderParam}&id=${restaurant_id}`}
            className="mx-auto"
          >
            <button className="mx-auto p-2 border-2 text-lg border-[#661268] shadow-lg poppins-semibold rounded-lg text-black flex justify-center items-center ">
              <AddCircleOutlineIcon />
              <span>Add New Items</span>
            </button>
          </Link>
        </div>

        {orderDetails[0].order_items[orderDetails[0].order_items.length - 1]
          .status !== "Ordered" && (
          <div>
            {orderDetails[0].order_status !== "waitingforbill" && (
              <div className="mb-8">
                <button
                  onClick={generateBill}
                  className="border-2 border-[#661268] text-lg mx-auto px-5 shadow-lg p-2 mt-2 poppins-semibold rounded-lg text-black flex justify-center items-center"
                >
                  <DescriptionIcon />
                  &nbsp;Generate Bill
                </button>
              </div>
            )}
            {orderDetails[0].order_status === "waitingforbill" && (
              <div className="mb-8 text-center mx-4 text-lg font-semibold text-[#661268]">
                <p>
                  Bill generation notification has been sent. Please get the
                  bill from the reception.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default OrderDetailsComponent;
