import express from 'express'
import * as subcategoryController from '../controller/subcategory.controller.js'

const router=express.Router()

router.post("/save",subcategoryController.save)

 router.get("/fetch",subcategoryController.fetch)

// router.delete("/deletecategory",categoryController.deleteCategory)

// router.patch("/update",categoryController.update)

export default router;