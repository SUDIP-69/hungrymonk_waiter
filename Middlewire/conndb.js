import mongoose from "mongoose";

const conndb = (handler) => (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req,res);
  } else {
    mongoose
      .connect(process.env.MONGOURI)
      return handler(req,res);
  }
};
export default conndb;
