import {Router} from "express"
import { login, register } from "../controllers/auth.controller"
import { validateRegister } from "../utils/validateRegister"
const router = Router()

router.post("/register",validateRegister,register)
router.post("/login", login)

export default router