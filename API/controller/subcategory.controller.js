import '../models/connection.js'
import url from 'url'
import path from 'path'

const __dirname = url.fileURLToPath(new URL('.',import.meta.url))

import subcategorySchemaModel from '../models/subcategory.model.js'




export const save=async(req,res)=>{
const subcategory=await subcategorySchemaModel.find();
const l=subcategory.length;
const _id=l==0?1:subcategory[l-1]._id+1;

//to get file and to move in specific folder
const caticon =req.files.caticon;
const subcaticonnm=Date.now()+"-"+caticon.name;
const uploadpath=path.join(__dirname,"../../UI/public/assests/upload/subcategoryicons",subcaticonnm);
caticon.mv(uploadpath);

const subcategoryDetails={...req.body,'_id':_id,"subcaticonnm":subcaticonnm};
// console.log(categoryDetails);

try{
await subcategorySchemaModel.create(subcategoryDetails)
res.status(201).json({"status":"ok"})
}
catch(error){
res.status(500).json({"status":"false"})
console.log(error);

}
}



export const fetch=async(req,res)=>{

//console.log(condition_obj)

var subcategoryList=await subcategorySchemaModel.find(req.query)
if(subcategoryList.length!=0)
    res.status(200).json(subcategoryList)
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



// export const update=async(req,res)=>{
//     var obj=req.body;
//     if(obj!=undefined){
//         let categoryDetails=await categorySchemaModel.findOne(JSON.parse(req.body.condition_obj))
//         if(categoryDetails)
//         {
//             let category=await categorySchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set:JSON.parse(req.body.content_obj)})
//             if(category)
//                 res.status(200).json({"msg":"ok"})
//             else
//                 res.status(500).json({"status":"server error"})
//         }
//         else
//         {
//             res.status(500).json({"status":".',;"})
//         }
//     }
//     else
//     {
//         res.status(500).json({"status":"enter valid conition"})
//     }
// }













