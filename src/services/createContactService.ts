import AppDataSource from '../data-source'
import { User } from '../entities/userEntity'
import jwt_decode from 'jwt-decode'

const createContactService = async (idUser, token): Promise<any> => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const decoded:any = jwt_decode(token)
        const user = await userRepository.findOneBy({
            id: +decoded.sub
        })
        if(!user){
            throw new Error('User not found')
        }
        if(user.id === +idUser){
            throw new Error('You can not add yourself as contact')
        }
        if(user.isActive === false){
            throw new Error('User is not active')
        }
        for (let i in user.contacts){
            if(user.contacts[i].id === +idUser){
                throw new Error('User is already a contact')
            }
        }
        const userToAddAsContact = await userRepository.findOneBy({ id: idUser })
        if(!userToAddAsContact){
            throw new Error('User to add as contact not found')
        }
        if(userToAddAsContact.isActive === false){
            throw new Error('User to add as contact is not active')
        }
        user.contacts.push(userToAddAsContact)
        await userRepository.save(user)
        return [200, user]
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

export default createContactService