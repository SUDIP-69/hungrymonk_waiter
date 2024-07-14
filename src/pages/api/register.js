import conndb from "../../../middleware/conndb";
import Waiter_credentials from "../../../models/Waiter_credentials";
import bcrypt from 'bcrypt'

const handler =async (req, res) => {
  try {
    if (req.method == "POST") {
      //console.log(req.body)
      const { username, password, email, name, phoneNo,restaurant_id } = req.body;
    //   console.log(username, password, email, name, phoneNo,resID);
      const passwordhashed = await bcrypt.hash(password, 10)
      const u = new Waiter_credentials({ username, password:passwordhashed, email, name, phoneNo,restaurant_id } );
      const u1  = await u.save();

      res.status(201).json({ success: true, data: u1 });
    } else {
      res.status(501).json({ success: false, data: "no data" });
    }
  } catch (error) {
    res.status(501).json({ success: false, data: "no data" });
  }
};

export default conndb(handler);
