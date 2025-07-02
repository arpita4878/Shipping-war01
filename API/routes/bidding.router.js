import express from 'express'
import * as BidController from '../controller/bidding.controller.js'
const router=express.Router()

router.post("/save",BidController.save)

 router.get("/fetch",BidController.fetch)

//  router.patch("/update",ProductController.update)

// router.delete("/deleteUser",UserController.deleteUser)

// router.post("/login",UserController.login)

export default router;