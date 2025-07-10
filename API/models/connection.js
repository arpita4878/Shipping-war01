import mongoose from "mongoose";
const url="mongodb+srv://arpitaseth192:@rpita1603@cluster0.tuzcz4n.mongodb.net/"
mongoose.connect(mongoose.connect(process.env.MONGO_URI))
console.log("successfully added database") 