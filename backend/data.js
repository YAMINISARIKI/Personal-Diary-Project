import mongoose from "mongoose";
const Schema = mongoose.Schema;

let DataSchema = new Schema({
    title:{
        type:String,
        required : true
    },
    content:{
        type:String,
        required : true
    },
    imagepath:{
        type:String,
        // required:true
    },
    usermail: {
        type: String,
        required: true
     },
    month: {
      type: Number, // or String, depending on your preference and use case
    },
})
export default mongoose.model("data",DataSchema);
