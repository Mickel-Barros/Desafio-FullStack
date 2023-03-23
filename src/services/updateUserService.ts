import { IUserRequest } from '../interfaces/users' 
import AppDataSource from '../data-source'
import { User } from '../entities/userEntity'
import { userWithoutPasswordSerializer } from '../serializers/userSerializer'
import jwt_decode from 'jwt-decode'

const updateUserService = async(userData, userId, token): Promise<any> => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const decoded:any = jwt_decode(token)
        console.log(decoded)
        const findUser = await userRepository.findOneBy({
            id: userId
        })
        const id = userData.id
        if(id !== undefined){
            throw new Error('Id change is not allowed')
        }
        const isAdm = userData.isAdm
        if(isAdm !== undefined){
            throw new Error('Id change is not allowed')
        }
        const isActive = userData.isActive
        if(isActive !== undefined){
            throw new Error('Id change is not allowed')
        }
        if(!findUser){
            throw new Error('User not found')
        }
        
        if(decoded.isAdm === false){
            if(decoded.sub !== userId){
                throw new Error('Not authorized')
            }
        }
        const updatedUser = userRepository.create({
            ...findUser,
            ...userData
        })
        await userRepository.save(updatedUser)
        const updatedUserWithoutPassord = await userWithoutPasswordSerializer.validate(updatedUser, {
            stripUnknown: true
        })
        
        return [200, updatedUserWithoutPassord]
        
    } catch (error) {
        if(error.message === 'Id change is not allowed'){
            return[401, {message: error.message}]
        }
        if(error.message === 'User not found'){
            return[404, {message: error.message}]
        }
        return[400, {message: error.message}]
    }
}

export default updateUserService