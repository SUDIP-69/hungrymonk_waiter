import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
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
    },resID:{
        type:String,
        required:true,
    }

},{timestamps: true});

const User = mongoose.models.User||mongoose.model("User",UserSchema);
export default User;