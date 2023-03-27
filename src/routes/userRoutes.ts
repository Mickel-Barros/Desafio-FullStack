import { Router } from 'express'
import {createUserController, deleteContactController, createContactController, listUsersController, updateUserController, deleteUserController} from '../controllers/userControllers'
import ensureAuthMiddleware from '../middlewares/ensureAuthMiddleware'
import ensureDataisValidMiddleware from '../middlewares/ensureDataIsValidMiddleware'
import { userSerializer } from '../serializers/userSerializer'


const userRoutes = Router()

userRoutes.post('', ensureDataisValidMiddleware(userSerializer), createUserController)
userRoutes.get('', listUsersController)
userRoutes.patch('/:id', ensureAuthMiddleware, updateUserController)
userRoutes.delete('/:id', ensureAuthMiddleware, deleteUserController)
userRoutes.post('/contact/:id', ensureAuthMiddleware, createContactController)
userRoutes.delete('/contact/:id', ensureAuthMiddleware, deleteContactController)

export default userRoutes