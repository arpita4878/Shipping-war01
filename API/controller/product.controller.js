import '../models/connection.js'
import url from 'url'
import path from 'path'

const __dirname = url.fileURLToPath(new URL('.',import.meta.url))

import productSchemaModel from '../models/product.model.js'




export const save=async(req,res)=>{
const product=await productSchemaModel.find();
const l=product.length;
const _id=l==0?1:product[l-1]._id+1;

//to get file and to move in specific folder
const shipment_image =req.files.shipment_image;
const shipment_imagenm=Date.now()+"-"+shipment_image.name;
const uploadpath=path.join(__dirname,"../../UI/public/assests/upload/Shipment_image",shipment_imagenm);
shipment_image.mv(uploadpath);

//to get file and to move in specific folder
const description_file =req.files.description_file;
const description_filenm=Date.now()+"-"+description_file.name;
const uploadpathDes=path.join(__dirname,"../../UI/public/assests/upload/description_file",description_filenm);
description_file.mv(uploadpathDes);


const productDetails={...req.body,'_id':_id,
"shipment_imagenm":shipment_imagenm,
'description_filenm':description_filenm,
"bid_status":1,"info":Date(),
"auctionprice":req.body.baseamount
};
// console.log(productDetails);

try{
await productSchemaModel.create(productDetails)
res.status(201).json({"status":"ok"})
}
catch(error){
res.status(500).json({"status":"false"})
console.log(error);

}
}



export const fetch=async(req,res)=>{
var ProductList=await productSchemaModel.find(req.query)


if(ProductList.length!=0)
    res.status(200).json(ProductList)
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













