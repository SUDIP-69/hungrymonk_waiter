"use client";
import { useEffect, useState } from "react";
import Accordion from "../Components/Accordion";
import DetailedView from "../Components/DetailedView";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../assets/baksish1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Table } from "@mui/material";

export default function Home() {
  
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      window.location = "/";
    }
  }, []);

  const item = {
    success: true,
    data: [
      {
        _id: "6681109ae86f4e672c4ef73c",
        customer_id: "CUS_demo",
        order_id: "abcd",
        restaurant_id: "test1",
        table_number: "table1",
        order_items: [
          {
            items: [
              {
                name: "Pizza",
                quantity: "6",
                price: "200",
                available_status: true,
                _id: "66811422e86f4e672c4ef747",
                createdAt: "2024-06-30T08:15:30.529Z",
                updatedAt: "2024-06-30T08:15:30.529Z",
              },
              {
                name: "Pizza",
                quantity: "4",
                price: "200",
                available_status: true,
                _id: "66811422e86f4e672c4ef748",
                createdAt: "2024-06-30T08:15:30.529Z",
                updatedAt: "2024-06-30T08:15:30.529Z",
              },
            ],
            notes: "test",
            item_total: "1200",
            charges: "200",
            total_price: "1400",
            status: "ordered",
            _id: "66811422e86f4e672c4ef746",
            createdAt: "2024-06-30T08:15:30.529Z",
            updatedAt: "2024-06-30T08:15:30.529Z",
          },
          {
            items: [
              {
                name: "Pizza",
                quantity: "6",
                price: "200",
                available_status: true,
                _id: "66811422e86f4e672c4ef747",
                createdAt: "2024-06-30T08:15:30.529Z",
                updatedAt: "2024-06-30T08:15:30.529Z",
              },
              {
                name: "Pizza",
                quantity: "4",
                price: "200",
                available_status: true,
                _id: "66811422e86f4e672c4ef748",
                createdAt: "2024-06-30T08:15:30.529Z",
                updatedAt: "2024-06-30T08:15:30.529Z",
              },
            ],
            notes: "test",
            item_total: "1200",
            charges: "200",
            total_price: "1400",
            status: "ordered",
            _id: "66811422e86f4e672c4ef746",
            createdAt: "2024-06-30T08:15:30.529Z",
            updatedAt: "2024-06-30T08:15:30.529Z",
          },
        ],

        total_bill: "1400",
        order_status: "updated",
        createdAt: "2024-06-30T08:00:26.619Z",
        updatedAt: "2024-06-30T08:17:19.793Z",
        __v: 0,
      },
      {
        _id: "668130b5b6f1b6674d67ad3e",
        customer_id: "CUS_demo",
        order_id: "abcdefsdfghg",
        restaurant_id: "test1",
        table_number: "table2",
        order_items: [
          {
            items: [
              {
                name: "Pizza",
                quantity: "6",
                price: "200",
                available_status: true,
                _id: "668130b5b6f1b6674d67ad40",
                createdAt: "2024-06-30T10:17:25.112Z",
                updatedAt: "2024-06-30T10:17:25.112Z",
              },
            ],
            notes: "test",
            item_total: "1200",
            charges: "200",
            total_price: "1400",
            status: "ordered",
            _id: "668130b5b6f1b6674d67ad3f",
            createdAt: "2024-06-30T10:17:25.113Z",
            updatedAt: "2024-06-30T10:17:25.113Z",
          },
        ],
        total_bill: "1400",
        order_status: "new",
        createdAt: "2024-06-30T10:17:25.113Z",
        updatedAt: "2024-06-30T10:17:25.113Z",
        __v: 0,
      },
      {
        _id: "668130bab6f1b6674d67ad46",
        customer_id: "CUS_demo",
        order_id: "asdfghg",
        restaurant_id: "test1",
        table_number: "table3",
        order_items: [
          {
            items: [
              {
                name: "Pizza",
                quantity: "6",
                price: "200",
                available_status: true,
                _id: "668130bab6f1b6674d67ad48",
                createdAt: "2024-06-30T10:17:30.784Z",
                updatedAt: "2024-06-30T10:17:30.784Z",
              },
            ],
            notes: "test",
            item_total: "1200",
            charges: "200",
            total_price: "1400",
            status: "ordered",
            _id: "668130bab6f1b6674d67ad47",
            createdAt: "2024-06-30T10:17:30.785Z",
            updatedAt: "2024-06-30T10:17:30.785Z",
          },
        ],
        total_bill: "1400",
        order_status: "new",
        createdAt: "2024-06-30T10:17:30.785Z",
        updatedAt: "2024-06-30T10:17:30.785Z",
        __v: 0,
      },
      {
        _id: "668130bfb6f1b6674d67ad4e",
        customer_id: "CUS_demo",
        order_id: "asdfgghjhg",
        restaurant_id: "test1",
        table_number: "table4",
        order_items: [
          {
            items: [
              {
                name: "Pizza",
                quantity: "6",
                price: "200",
                available_status: true,
                _id: "668130bfb6f1b6674d67ad50",
                createdAt: "2024-06-30T10:17:35.774Z",
                updatedAt: "2024-06-30T10:17:35.774Z",
              },
            ],
            notes: "test",
            item_total: "1200",
            charges: "200",
            total_price: "1400",
            status: "ordered",
            _id: "668130bfb6f1b6674d67ad4f",
            createdAt: "2024-06-30T10:17:35.775Z",
            updatedAt: "2024-06-30T10:17:35.775Z",
          },
        ],
        total_bill: "1400",
        order_status: "new",
        createdAt: "2024-06-30T10:17:35.775Z",
        updatedAt: "2024-06-30T10:17:35.775Z",
        __v: 0,
      },
    ],
  };

  const [openAccordion, setOpenAccordion] = useState(null);

  const handleToggle = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleClick = (e) => {
    e.preventDefault()
    localStorage.removeItem("accessToken")
    router.push("/")
  }

  const tableOrders = item.data.reduce((acc, order) => {
    if (!acc[order.table_number]) {
      acc[order.table_number] = [];
    }
    acc[order.table_number].push(order);
    return acc;
  }, {});

  return (
    <>
      <header className="bg-[#4E0433] p-4 text-white font-bold tracking-widest text-center text-2xl">
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
        <div className="flex font-extrabold tracking-widest text-2xl justify-center items-center mt-2">
          ORDERS
        </div>
        <hr className="h-[2px] mx-auto bg-[#4E0433] mb-5 rounded-2xl w-32" />
      </div>
      <main>
        {Object.keys(tableOrders).map((tableNumber, index) => (
          <Accordion
            key={index}
            title={`Table ${tableNumber.split("table")[1]}`}
            onToggle={() => handleToggle(tableNumber)}
            id={tableNumber}
            isOpen={openAccordion === tableNumber}
            status={tableOrders[tableNumber]}
            item={tableOrders[tableNumber]}
          >
            <DetailedView orders={tableOrders[tableNumber]} />
          </Accordion>
        ))}
      </main>
    </>
  );
}
