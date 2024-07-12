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



import conndb from "../../../middleware/conndb";
import Orders from "../../../models/Orders";
import { FoodItems } from "../../../models/FoodItems";
import SingleOrders from "../../../models/SingleOrders";
import OrderFoodItems from "../../../models/OrderFoodItems";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { restaurant_id } = req.body;
      console.log(restaurant_id)
      const orders = await Orders.find({restaurant_id})
        .populate({
          path: 'order_items',
          populate: {
            path: 'items',
            populate: {
              path: 'food',
              model: 'FoodItems'
            }
          }
        });
        console.log("ord",orders);
        if(orders.length > 0) {
      res.status(200).json({ success: true, data: orders });
        } else {
        res.status(200).json({ success: true, data: null });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default conndb(handler);

