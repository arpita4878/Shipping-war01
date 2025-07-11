import '../models/connection.js'
import url from 'url'
import path from 'path'

const __dirname = url.fileURLToPath(new URL('.',import.meta.url))

import categorySchemaModel from '../models/category.model.js'
import fs from 'fs';


const uploadDir = path.join(__dirname, '../uploads/categoryicons');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });




export const save=async(req,res)=>{
const category=await categorySchemaModel.find();
const l=category.length;
const _id=l==0?1:category[l-1]._id+1;

//to get file and to move in specific folder
const caticon = req.files.caticon;
const caticonnm = Date.now() + "-" + caticon.name;
const uploadpath = path.join(uploadDir, caticonnm);

caticon.mv(uploadpath);


const categoryDetails = {
  ...req.body,
  _id: _id,
  caticonnm: caticonnm,
  imageUrl: `/uploads/categoryicons/${caticonnm}`
};// console.log(categoryDetails);

try{
await categorySchemaModel.create(categoryDetails)
res.status(201).json({"status":"ok"})
}
catch(error){
res.status(500).json({"status":"false"})
console.log(error);

}
}



export const fetch=async(req,res)=>{
var condition_obj=url.parse(req.url,true).query.condition_obj

//console.log(condition_obj)

var categoryList=await categorySchemaModel.find(condition_obj)


if(categoryList.length!=0)
    res.status(200).json(categoryList)
else
res.status(404).json({"status":"resource not found"})
}



export const deleteCategory=async(req,res)=>{
    var obj=req.body;
    if(obj!=undefined)
    {
        var condition_obj=JSON.parse(req.body.condition_obj)
        let categoryDetails=await categorySchemaModel.findOne(condition_obj)
        if(categoryDetails)
        {
            let category=await categorySchemaModel.deleteOne(condition_obj)
            if(category)
                res.status(200).json({"status":"ok"})
            else
                res.status(404).json({"status":"error"})
        }
        else
        {
            res.status(500).json({"status":"request souce not found"})
        }
    }
    else
    {
        res.status(500).json({"status":"enter valid condition"})
    }
}


export const update=async(req,res)=>{
    var obj=req.body;
    //console.log(obj)
    if(obj!=undefined){
        let categoryDetails=await categorySchemaModel.findOne(req.body.condition_obj)
      //  console.log(categoryDetails);
        
        if(categoryDetails)
        {
            let category=await categorySchemaModel.updateOne(req.body.condition_obj,{$set:req.body.content_obj})
            if(category)
                res.status(200).json({"msg":"ok"})
            else
                res.status(500).json({"status":"server error"})
        }
        else
        {
            res.status(404).json({"status":"not  found"})
        }
    }
    else
    {
        res.status(500).json({"status":"enter valid conition"})
     }
}













