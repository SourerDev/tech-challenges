import {Router} from "express"
import {hello, signUp,logIn,updatedUser} from "../controllers/index"
import {authenticateToken} from '../middlewares/index'

const router = Router()

//routes
router.get('/',hello)
router.post('/signup',signUp)
router.post('/login',logIn)
router.put('/updateuser',authenticateToken,updatedUser)

export default router