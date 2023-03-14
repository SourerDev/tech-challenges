import {Router} from "express"
import {hello, signUp,logIn} from "../controllers/index"

const router = Router()

//routes
router.get('/',hello)
router.post('/signup',signUp)
router.post('/login',logIn)

export default router