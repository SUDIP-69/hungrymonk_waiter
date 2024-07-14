import conndb from "../../../middleware/conndb";
import Orders from "../../../models/Orders";
import SingleOrders from "../../../models/SingleOrders";

const handler = async (req, res) => {
  if (req.method === "POST") {
    //console.log(req.body)
    const {orderId } = req.body;
    try {
      const order = await Orders.findOneAndUpdate({order_id: orderId},{order_status:"waitingforbill"});
      //console.log(order)
      if (!order) {
        res.status(404).json({ success: false, message: "Order not found" });
      }
      else{
        res.status(200).json({ success: true, data: order });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default conndb(handler);
