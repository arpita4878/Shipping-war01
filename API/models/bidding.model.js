import mongoose from "mongoose";

const bidSchema=mongoose.Schema({
    _id:Number,
    p_id:Number,
    bidamount:Number,
    t_id:String,
    info:String,
    bid_status:Number
})


//compile to schema model
const bidSchemaModel=mongoose.model('Bidding_Product_collection',bidSchema)

export default bidSchemaModel;