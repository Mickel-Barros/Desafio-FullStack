import { Request, Response } from 'express'
import { IUserLogin } from '../interfaces/users'
import loginService from '../services/loginService'

const loginController = async (req: Request, res: Response) => {
    const userData: IUserLogin= req.body
    const [status, data] = await loginService(userData)
    return res.status(status).json(data)
}

export {loginController}
