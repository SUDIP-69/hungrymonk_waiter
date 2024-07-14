import conndb from "../../../middleware/conndb";
import Orders from "../../../models/Orders";
import SingleOrders from "../../../models/SingleOrders";
import OrderFoodItems from "../../../models/OrderFoodItems";
import { FoodItems } from "../../../models/FoodItems";
import RestaurantItems from "../../../models/RestaurantItems";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    try {
      const { orderId ,cgst,sgst} = req.body;
      
      const orders = await Orders.find({ order_id: orderId }).populate({
        path: "order_items",
        populate: {
          path: "items",
          populate: {
            path: "food",
            model: "FoodItems",
          },
        },
      });
      if (orders.length > 0) {
        const o = orders[0].order_items;
        let totquantity = 0;
        let price = 0;
        for (let i = 0; i < o.length; i++) {
          const item = o[i];
          //console.log(item)
          for (let j = 0; j < item.items.length; j++) {
            // console.log(item.items.length)
            totquantity += parseFloat(item.items[j]?.quantity);
            price +=
              parseFloat(item.items[j]?.quantity) *
              parseFloat(item.items[j]?.food.price);
          }
        }
        console.log(totquantity, price);
        const calculatedtaxrate=(0.01*(parseFloat(cgst)+parseFloat(sgst))).toFixed(2);
        const tax = (parseFloat(price) * parseFloat(calculatedtaxrate)).toFixed(2);
        const total_bill = (parseFloat(price) + parseFloat(tax)).toFixed(2);
        const newupdatedpriceorder= await Orders.findOneAndUpdate({order_id:orderId},{initial_bill:price,tax:tax,total_bill:total_bill,total_quantity:totquantity});
        if(newupdatedpriceorder){
          res.status(200).json({ success: true, data: newupdatedpriceorder });
        }
        else{
          res.status(201).json({ success: false, message: "Error in updating bill" });
        }
      } else {
        res.status(201).json({ success: false, message: "No order found" });
      }
    } catch (e) {
      console.error(e);
      res.status(201).json({
        success: false,
        error:
          "We are facing some technical issue currently, you can however order in-person directly to the waiter",
      });
    }
  } else {
    res.status(201).json({
      success: false,
      error: "Method not allowed. Please use POST method.",
    });
  }
};

export default conndb(handler);
