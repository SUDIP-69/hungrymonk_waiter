import conndb from "../../../middleware/conndb";
import SingleOrders from "../../../models/SingleOrders";


const handler = async (req, res) => {
  if (req.method === "POST") {
    //console.log(req.body)
    const {singleOrderId } = req.body;
    try {
      const order = await SingleOrders.findByIdAndUpdate(singleOrderId,{status:"Confirmed" });
      //console.log(order)
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
      else{
      return res.status(200).json({ success: true, data: order });
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
