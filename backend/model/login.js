import mongoose from "mongoose";
const Schema = mongoose.Schema;

let LoginSchema = new Schema({
    username : {
        type:String,
        required : true
    },
    password : {
        type:String,
        required : true
    }
})
export default mongoose.model("login",LoginSchema);