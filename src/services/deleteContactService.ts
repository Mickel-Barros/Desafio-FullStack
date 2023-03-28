import AppDataSource from '../data-source'
import { User } from '../entities/userEntity'
import jwt_decode from 'jwt-decode'

const deleteContactService = async (idUser, token): Promise<any> => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const decoded:any = jwt_decode(token)
        const user = await userRepository.findOneBy({
            id: +decoded.sub
        })
        if(!user){
            throw new Error('User not found')
        }
        if(user.isActive === false){
            throw new Error('User is not active')
        }
        const contactIndex = user.contacts.findIndex((contact) => contact.id === +idUser);
        if(contactIndex === -1){
            throw new Error('User is not a contact')
        }
        user.contacts.splice(contactIndex, 1);
        await userRepository.save(user)
        return [204, user]
    } catch (error) {
        if(error.message === 'Not authorized'){
            return[403, {message: error.message}]
        }
        if(error.message === 'User is not active'){
            return[400, {message: error.message}]
        }
        return[404, {message: error.message}]
    }
}  

export default deleteContactService