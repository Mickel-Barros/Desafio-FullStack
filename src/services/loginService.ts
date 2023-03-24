import { IUserLogin } from '../interfaces/users'
import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import AppDataSource from '../data-source'
import { User } from '../entities/userEntity'
import 'dotenv/config'

const loginService = async ( { email, password }: IUserLogin ): Promise<any> => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({
            email: email
        })
        if(!user){
            throw new Error('User or password invalid')
        }
        if(user.isActive === false){
            throw new Error('User not active')
        }
        const passwordCheck = await compare(password, user?.password as string);
        if(!passwordCheck){
            throw new Error('User or password invalid')
        }
        const token = jwt.sign(
            {
                isAdm: user.isAdm
            },
            process.env.SECRET_KEY,
            {
                subject: String(user.id), 
                expiresIn: '24h'
            }
        )
        return [200, {token: token}]
    } catch (error) {
        if(error.message === 'User not active'){
            return [400, {message: error.message}]
        }
        return [403, {message: error.message}]
    }
}

export default loginService