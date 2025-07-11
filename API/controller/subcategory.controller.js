import '../models/connection.js';
import url from 'url';
import path from 'path';
import fs from 'fs';
import subcategorySchemaModel from '../models/subcategory.model.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const save = async (req, res) => {
  try {
    const subcategories = await subcategorySchemaModel.find();
    const l = subcategories.length;
    const _id = l === 0 ? 1 : subcategories[l - 1]._id + 1;

    // Ensure uploads folder exists
    const uploadFolder = path.join(__dirname, '../uploads/subcategoryicons');
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    // Handle file upload
    const caticon = req.files.caticon;
    const subcaticonnm = Date.now() + "-" + caticon.name;
    const uploadpath = path.join(uploadFolder, subcaticonnm);

    await caticon.mv(uploadpath);

    // Save path in DB (can also store full URL if preferred)
    const subcategoryDetails = {
      ...req.body,
      _id: _id,
      subcaticonnm: subcaticonnm,
      imageUrl: `/uploads/subcategoryicons/${subcaticonnm}` // optional: frontend use
    };

    await subcategorySchemaModel.create(subcategoryDetails);

    res.status(201).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'false', error: error.message });
  }
};



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













