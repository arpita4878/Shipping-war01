import '../models/connection.js';
import url from 'url';
import path from 'path';
import fs from 'fs';
import productSchemaModel from '../models/product.model.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const save = async (req, res) => {
  try {
    const productList = await productSchemaModel.find();
    const _id = productList.length === 0 ? 1 : productList[productList.length - 1]._id + 1;

    // 🔸 Create folders if they don't exist
    const shipmentDir = path.join(__dirname, '../uploads/Shipment_image');
    const descriptionDir = path.join(__dirname, '../uploads/description_file');

    if (!fs.existsSync(shipmentDir)) fs.mkdirSync(shipmentDir, { recursive: true });
    if (!fs.existsSync(descriptionDir)) fs.mkdirSync(descriptionDir, { recursive: true });

    // 🔸 Move image file
    const shipment_image = req.files.shipment_image;
    const shipment_imagenm = Date.now() + '-' + shipment_image.name;
    const shipmentPath = path.join(shipmentDir, shipment_imagenm);
    await shipment_image.mv(shipmentPath);

    // 🔸 Move description file
    const description_file = req.files.description_file;
    const description_filenm = Date.now() + '-' + description_file.name;
    const descriptionPath = path.join(descriptionDir, description_filenm);
    await description_file.mv(descriptionPath);

    // 🔸 Prepare product object
    const productDetails = {
      ...req.body,
      _id,
      shipment_imagenm,
      description_filenm,
      imageUrl: `/uploads/Shipment_image/${shipment_imagenm}`,
      fileUrl: `/uploads/description_file/${description_filenm}`,
      bid_status: 1,
      info: new Date(),
      auctionprice: req.body.baseamount
    };

    // 🔸 Save to MongoDB
    await productSchemaModel.create(productDetails);
    res.status(201).json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'false', error: error.message });
  }
};



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













