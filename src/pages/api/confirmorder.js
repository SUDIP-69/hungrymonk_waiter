import conndb from "../../../Middlewire/conndb";
import Orders from "../../../models/Orders";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { orderId, singleOrderId, newStatus } = req.body;

    try {
      const order = await Orders.findOne({ "order_items._id": singleOrderId });

      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      const singleOrder = order.order_items.id(singleOrderId);

      if (!singleOrder) {
        return res.status(404).json({ success: false, message: "Single order not found" });
      }

      singleOrder.status = newStatus;
      await order.save();

      return res.status(200).json({ success: true, data: singleOrder });
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default conndb(handler);
