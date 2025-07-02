import express from 'express'
import * as categoryController from '../controller/category.controller.js'

const router=express.Router()

router.post("/save",categoryController.save)

router.get("/fetch",categoryController.fetch)

router.delete("/deletecategory",categoryController.deleteCategory)

router.patch("/update",categoryController.update)

export default router;