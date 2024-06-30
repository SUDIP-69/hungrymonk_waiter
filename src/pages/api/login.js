import conndb from "../../../Middlewire/conndb";
import User from "../../../Models/User";
import bcrypt from 'bcrypt'

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      const { username, password } = req.body;
      console.log(username, password);
      if (username) {
        const users = await User.findOne({ username });
        //console.log(users);
        if (users) {
          const ismatch = await bcrypt.compare(password, users.password);
          //console.log(ismatch);
          if (ismatch) {
            res.json({ success: true });
          } else {
            throw new error();
          }
        } else {
          res.json({ success: false });
        }
      }

      res.status(201).json({ success: true, data: "data" });
    } else {
      res.status(501).json({ success: false, data: "data" });
    }
  } catch (error) {
    res.status(501).json({ success: false, data: "data" });
  }
};

export default conndb(handler);
