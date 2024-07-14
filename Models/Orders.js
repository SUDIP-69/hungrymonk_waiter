import mongoose from "mongoose";
import SingleOrders from "./SingleOrders";

const orders = new mongoose.Schema(
  {
    customer_id: {
      type: String,
    },
    order_id: {
      type: String,
    },
    restaurant_id: {
      type: String,
    },
    table_number: {
      type: String,
    },
    order_items: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SingleOrders" },
    ],
    total_quantity: {
      type: String,
    },
    initial_bill: {
      type: String,
    },
    tax: {
      type: String,
    },
    discount: {
      type: String,
    },
    total_bill: {
      type: String,
    },
    order_status: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Orders || mongoose.model("Orders", orders);
