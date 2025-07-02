import express from 'express'
import * as UserController from '../controller/user.controller.js'
const router=express.Router()

router.post("/save",UserController.save)

router.get("/fetch",UserController.fetch)

router.patch("/update",UserController.update)

router.delete("/deleteUser",UserController.deleteUser)

router.post("/login",UserController.login)

export default router;