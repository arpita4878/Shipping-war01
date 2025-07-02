import express from 'express'
import * as ProductController from '../controller/product.controller.js'
const router=express.Router()

router.post("/save",ProductController.save)

 router.get("/fetch",ProductController.fetch)

 router.patch("/update",ProductController.update)

// router.delete("/deleteUser",UserController.deleteUser)

// router.post("/login",UserController.login)

export default router;