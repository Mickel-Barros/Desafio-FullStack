import { Router } from 'express'
import { loginController } from '../controllers/loginController'


const loginRoute = Router()
loginRoute.post('', loginController)

export default loginRoute