import mongoose from "mongoose";
const url="mongodb://127.0.0.1:27017/shipping_War"
mongoose.connect(url)
console.log("successfully added database") 