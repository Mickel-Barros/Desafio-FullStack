import { Request, Response } from 'express'
import { IUserRequest } from '../interfaces/users/index'
import createUserService from '../services/createUserService'
import listUsersService from '../services/listUsersService'
import deleteUserService from '../services/deleteUserService'
import updateUserService from '../services/updateUserService'
import createContactService from '../services/createContactService'
import deleteContactService from '../services/deleteContactService'

const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body
    const [status, data] = await createUserService(userData)
    return res.status(status).json(data)
}

const listUsersController = async (req: Request, res: Response) => {
    const [status, data] = await listUsersService(req.headers.authorization)
    return res.status(status).json(data)
}

const updateUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body
    const [status, data] = await updateUserService(userData, req.params.id, req.headers.authorization)
    return res.status(status).json(data)
}

const deleteUserController = async (req: Request, res: Response) => {
    const [status, data] = await deleteUserService(req.params.id, req.headers.authorization)
    return res.status(status).json(data)
}

const createContactController = async (req: Request, res: Response) => {
    const [status, data] = await createContactService(req.params.id, req.headers.authorization)
    return res.status(status).json(data)
}

const deleteContactController = async (req: Request, res: Response) => {
    const [status, data] = await deleteContactService(req.params.id, req.headers.authorization)
    return res.status(status).json(data)
}


export {createUserController, deleteContactController, listUsersController, updateUserController, deleteUserController, createContactController}