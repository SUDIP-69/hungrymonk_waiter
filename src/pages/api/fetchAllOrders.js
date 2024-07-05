// import conndb from "../../../Middlewire/conndb";
// import Orders from "../../../models/Orders";

// const handler = async (req, res) => {
//   const io = req.socket.server.io; // Access the io instance
//   try {
//     if (req.method === "POST") {
//       const { restaurant_id } = req.body;
//       const orders = await Orders.find({ restaurant_id });
//       if (orders) {
//         io.emit("ordersUpdate", orders); // Emit orders update to all connected clients
//         res.status(200).json({ success: true, data: orders });
//       } else {
//         res.status(404).json({ success: false, data: "No orders found" });
//       }
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export default conndb(handler);



import conndb from "../../../Middlewire/conndb";
import Orders from "../../../models/Orders";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { restaurant_id } = req.body;
      const orders = await Orders.find({ restaurant_id });
      if (orders) {
        res.status(200).json({ success: true, data: orders });
      } else {
        res.status(404).json({ success: false, data: "No orders found" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default conndb(handler);

