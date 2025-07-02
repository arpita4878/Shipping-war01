import mongoose from "mongoose";
import UniqueValidator from "mongoose-unique-validator";

const subcategorySchema=mongoose.Schema({
    _id:Number,
    catnm:{
        type:String,
        trim:true,
        required:[true,"category name required"],
        lowercase:true
    },
    subcatnm:{
        type:String,
        trim:true,
        unique:true,
        required:[true,"category name required"],
        lowercase:true
    },
   subcaticonnm:{
        type:String,
        trim:true,
        lowercase:true,
        required:[true,"category icon name required"]
    }
})

//apply uniquevalidator plugin to categorySchema
subcategorySchema.plugin(UniqueValidator)

//compile to schema model
const subcategorySchemaModel=mongoose.model('sub_category_collection',subcategorySchema)

export default subcategorySchemaModel;