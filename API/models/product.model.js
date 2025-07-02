import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    _id:Number,
    catnm:{
        type:String,
        trim:true,
        required:[true,"category name required"],
    },
     title:{
        type:String,
        trim:true,
        required:[true,"title is required"],
       
    },
    useremail:{
        type:String,
        trim:true,
        required:[true,"email is required"],   
    },
    auctionprice:{
        type:Number,
        trim:true,
        required:[true,"auction price is required"], 
    },
    subcatnm:{
        type:String,
        trim:true,
        required:[true,"subcategory name required"],      
    },
    baseamount:{
        type:Number,
        trim:true,
        required:[true,"amount is required"],      
    },
    description_filenm:{
        type:String,
        trim:true,
        required:[true,"description  required"],        
    },
   shipment_imagenm:{
        type:String,
        trim:true,
        required:[true,"shipment image  required"]
    },
    alloted_to: {
  type: String,
  default: "null"
},
    info:String,
    bid_status:Number
})


//compile to schema model
const productSchemaModel=mongoose.model('Product_collection',productSchema)

export default productSchemaModel;