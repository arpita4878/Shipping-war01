import "../models/connection.js";

import url from 'url'
import jwt from 'jsonwebtoken'
import rs from 'randomstring'

import UserSchemaModel from "../models/user.model.js";
import passwordGenerator from './password.controller.js';
import emailVerification from './email.controller.js';

export const save = async (req, res) => {
  try {
    const users = await UserSchemaModel.find();
    const _id = users.length === 0 ? 1 : users[users.length - 1]._id + 1;

    const password = passwordGenerator(); // Make sure this returns a string!

    const userDetails = {
      ...req.body,
      _id,
      password,
      status: 0,
      role: 'user',
      info: new Date()
    };

    await UserSchemaModel.create(userDetails);

    await emailVerification(userDetails.email, password); // await here!

    res.status(201).json({ status: true });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ status: false });
  }
};

//save-post



export const fetch=async(req,res)=>{
   var userList=await UserSchemaModel.find(req.query);
   if(userList.length!=0)
     res.status(200).json(userList);
   else
     res.status(404).json({"status":"Resource not found"});
  };


   export var deleteUser=async(req,res)=>{
      var obj=req.body;
      //console.log(obj);
      
      if(obj!=undefined)
      {
         let userDetail=await UserSchemaModel.findOne(obj);
         if(userDetail)
         {
            let user=await UserSchemaModel.deleteOne(obj)
            if(user)
               res.status(200).json({"status":"ok"})
            else
            res.status(500).json({"status":"server error"})
         }
         else
         {
            res.status(404).json({"status":"request source not availabl"})
         }
      }
      else{
         res.status(500).json({"status":"enter valid condition"})
      }
      //delete
   }


   export var update=async(req,res)=>{
      var obj=req.body;
     // console.log(obj);
      
      if(obj!=undefined)
      {
         let userDetails=await UserSchemaModel.findOne(req.body.condition_obj);
         if(userDetails)
         {
            let user=await UserSchemaModel.updateOne(req.body.condition_obj,{$set:req.body.content_obj})
            if(user)
               res.status(200).json({"msg":"ok"})
            else
            res.status(500).json({"status":"server error"})
         }
         else
         {
            res.status(404).json({"status":"resource not found"})
         }
      }
      else
      {
         res.status(500).json({"status":"enter valid condition"})
      }
   }

   
   //login
      export const login=async(req,res)=>{
        // console.log(req.body)
         var condition_obj={...req.body,"status":1};
         var userList=await UserSchemaModel.find(condition_obj);
         if(userList.length!=0)
         {
            const payload=userList[0].email;
            const key=rs.generate(50)
            const token=jwt.sign(payload,key);
            res.status(200).json({"token":token,"userDetails":userList[0]});
         }
         else
         res.status(500).json({"token":"error"})
      
      }
