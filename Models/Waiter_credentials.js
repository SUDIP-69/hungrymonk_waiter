import mongoose from "mongoose";
const waiterSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },password:{
        type:String,
        required:true,
    },email:{
        type:String,
        required:true,
    },phoneNo:{
        type:String,
        required:true,
    },name:{
        type:String,
        required:true,
    },restaurant_id:{
        type:String,
        required:true,
    }

},{timestamps: true});

const Waiter_credentials = mongoose.models.Waiter_credentials||mongoose.model("Waiter_credentials",waiterSchema);
export default Waiter_credentials;