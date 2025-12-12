import {Router} from "express"
import {  getUserController, loginController, logoutController, registerController } from "../controllers/auth.controller"
import { validateRegister } from "../utils/validateRegister"
import { authMiddleware } from "../middlewares/auth.middleware"
const router = Router()

router.post("/register",validateRegister,registerController)
router.post("/login", loginController)
router.post("/logout", logoutController)
router.get("/me", authMiddleware, getUserController)


export default router