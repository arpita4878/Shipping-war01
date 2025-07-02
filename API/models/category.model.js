import mongoose from "mongoose";
import UniqueValidator from "mongoose-unique-validator";

const categorySchema=mongoose.Schema({
    _id:Number,
    catnm:{
        type:String,
        trim:true,
        unique:true,
        required:[true,"category name required"],
        lowercase:true
    },
    caticonnm:{
        type:String,
        trim:true,
        lowercase:true,
        required:[true,"category icon name required"]
    }
})

//apply uniquevalidator plugin to categorySchema
categorySchema.plugin(UniqueValidator)

//compile to schema model
const categorySchemaModel=mongoose.model('category_collection',categorySchema)

export default categorySchemaModel;