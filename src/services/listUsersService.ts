import AppDataSource from '../data-source'
import { User } from '../entities/userEntity'
import jwt_decode from 'jwt-decode'

const listUsersService = async (token): Promise<any> => {
    try {
        
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()
        const noPassword = users.map((user)=>{
            delete user.password
        })
    
        return [200, users]
    } catch (error) {
        return[403, {message: error.message}]
    }
}  

export default listUsersService