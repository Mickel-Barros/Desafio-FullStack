import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IUserRequest, IUser, IUserUpdate, IUserContact } from '../interfaces/users'

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().notRequired(),
    bio: yup.string().notRequired(),
    phone: yup.number().notRequired(),
    img: yup.string().notRequired(),
    contacts: yup.array().of(
        yup.object().shape({
            name: yup.string().notRequired(),
            email: yup.string().email().notRequired(),
            phone: yup.number().notRequired(),
            img: yup.string().notRequired(),
            bio: yup.string().notRequired(),
          }
    )).notRequired(),
})

const userWithoutPasswordSerializer: SchemaOf<IUser> = yup.object().shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    isAdm: yup.boolean().notRequired(),
    img: yup.string().notRequired(),
    isActive: yup.boolean().notRequired(),
    phone: yup.number().notRequired(),
    bio: yup.string().notRequired(),
    contacts: yup.array().of(
        yup.object().shape({
            name: yup.string().notRequired(),
            email: yup.string().email().notRequired(),
            phone: yup.number().notRequired(),
            img: yup.string().notRequired(),
            bio: yup.string().notRequired(),
          }
    )).notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired()
})

const userUpdatedSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
    password: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    phone: yup.number().notRequired(),
    img: yup.string().notRequired(),
    bio: yup.string().notRequired()
})

export { userSerializer, userWithoutPasswordSerializer, userUpdatedSerializer }