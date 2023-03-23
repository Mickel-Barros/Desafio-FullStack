import { IUserRequest, IUser } from '../interfaces/users' 
import AppDataSource from '../data-source'
import { User } from '../entities/userEntity'
import { userWithoutPasswordSerializer } from '../serializers/userSerializer'

const createUserService = async(userData: IUserRequest): Promise<any> => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const checkEmail = await userRepository.findOneBy({
            email: userData.email
        })
        if(checkEmail){
            throw new Error('User already exists')
        }
        const createdUser = userRepository.create(userData)
        await userRepository.save(createdUser)
        const userWithoutPassord = await userWithoutPasswordSerializer.validate(createdUser, {
            stripUnknown: true
        })

        return [201, userWithoutPassord]
    } catch (error) {
        console.log(error)
        if(error.message === 'User already exists'){
            return[409, {message: error.message} ]
        }
        return[400, {message: error.message} ]
    }
}

export default createUserService