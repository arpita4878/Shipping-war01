import '../models/connection.js'
import url from 'url'
import path from 'path'


import bidSchemaModel from '../models/bidding.model.js'

export const save=async(req,res)=>{
const bidList=await bidSchemaModel.find();
const l=bidList.length;
const _id=l==0?1:bidList[l-1]._id+1;


const bidDetails={...req.body,'_id':_id,
"bid_status":0,
"info":Date()
};
// console.log(productDetails);

try{
await bidSchemaModel.create(bidDetails)
res.status(201).json({"status":"ok"})
}
catch(error){
res.status(500).json({"status":"false"})
console.log(error);

}
}



export const fetch=async(req,res)=>{
var bidList=await bidSchemaModel.find(req.query)


if(bidList.length!=0)
    res.status(200).json(bidList)
else
res.status(404).json({"status":"resource not found"})
}



// export const deleteCategory=async(req,res)=>{
//     var obj=req.body;
//     if(obj!=undefined)
//     {
//         var condition_obj=JSON.parse(req.body.condition_obj)
//         let categoryDetails=await categorySchemaModel.findOne(condition_obj)
//         if(categoryDetails)
//         {
//             let category=await categorySchemaModel.deleteOne(condition_obj)
//             if(category)
//                 res.status(200).json({"status":"ok"})
//             else
//                 res.status(404).json({"status":"error"})
//         }
//         else
//         {
//             res.status(500).json({"status":"request souce not found"})
//         }
//     }
//     else
//     {
//         res.status(500).json({"status":"enter valid condition"})
//     }
// }



export const update=async(req,res)=>{
    var obj=req.body;
   // console.log(obj);
    
    if(obj!=undefined){
        let pDetails=await productSchemaModel.findOne(req.body.condition_obj)
        if(pDetails)
        {
            let product=await productSchemaModel.updateOne(req.body.condition_obj,{$set:req.body.content_obj})
            if(product)
                res.status(200).json({"msg":"ok"})
            else
                res.status(500).json({"status":"server error"})
        }
        else
        {
            res.status(404).json({"status":"not found"})
        }
    }
    else
    {
        res.status(500).json({"status":"enter valid conition"})
    }
}













