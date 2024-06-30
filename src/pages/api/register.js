import conndb from "../../../Middlewire/conndb";
import User from "../../../Models/User";
import bcrypt from 'bcrypt'

const handler =async (req, res) => {
  try {
    if (req.method == "POST") {
      const { username, password, email, name, phoneNo,resID } = req.body;
    //   console.log(username, password, email, name, phoneNo,resID);
      const passwordhashed = await bcrypt.hash(password, 10)
      const u = new User({ username, password:passwordhashed, email, name, phoneNo,resID } );
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
