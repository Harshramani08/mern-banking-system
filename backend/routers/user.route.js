import { Router } from "express";
import { getUser, userLogin, userLogOut, userRegister } from "../controller/user.controller.js";
import auth from '../middleware/auth.middleware.js'
const router = Router()

router.post("/register", userRegister)
router.post("/login", userLogin)
router.post('/logout', userLogOut)
router.get('/me', auth, getUser)

export default router

