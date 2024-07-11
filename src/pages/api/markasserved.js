import conndb from "../../../middleware/conndb";
import Orders from "../../../models/Orders";
import { FoodItems } from "../../../models/FoodItems";
import SingleOrders from "../../../models/SingleOrders";
import OrderFoodItems from "../../../models/OrderFoodItems";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
        console.log(req.body);
      const id = req.body.id;
      const order = await Orders.findByIdAndUpdate(id, {
        order_status: "served",
      });
      if (!order) {
        return res.status(200).json({success:false, message: "Order not found" });
      }else{
        return res.status(200).json({success:true,message: "Order updated"})
      }
    } catch (error) {
      // console.log(error);
      res.status(500).json({ success:false,message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success:false,message: "Method Not Allowed" });
  }
};

export default conndb(handler);
