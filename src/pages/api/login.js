import conndb from "../../../middleware/conndb";
import Waiter_credentials from "../../../models/Waiter_credentials";
import bcrypt from "bcrypt";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      const { username, password } = req.body;
      //console.log(username, password);
      if (username) {
        const users = await Waiter_credentials.findOne({ username });
        //console.log(users);
        if (users) {
          const ismatch = await bcrypt.compare(password, users.password);
          //console.log(ismatch);
          if (ismatch) {
            const token = jwt.sign({ name: users.name }, "qwerty");
            
            //console.log(token);
            res.json({
              success: true,
              token: token,
              restaurant_id: users.restaurant_id
            });
          } else {
            res.json({ success: false, token: null });
          }
        } else {
          res.json({ success: false });
        }
      } else {
        res.status(201).json({ success: false, token: null });
      }
    } else {
      res.status(201).json({ success: false, token: null });
    }
  } catch (error) {
    res.status(201).json({ success: false, token: null });
  }
};

export default conndb(handler);
