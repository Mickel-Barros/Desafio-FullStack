export interface IUserRequest {
    name: string
    email: string
    password: string
    isAdm: boolean
}

export interface IUser {
    id?: string
    name?: string
    email?: string
    isAdm?: boolean
    isActive?: boolean
    bio?: string
    phone?: number
    img?: string
    contacts?: Array<IUserContact>
    createdAt?: Date
    updatedAt?: Date
}

export interface IUserContact {
    name?: string
    email?: string
    img?: string
    phone?: number
    createdAt?: Date
}


export interface IUserLogin {
    email: string
    password: string
}

export interface IUserUpdate {
    name?: string
    email?: string
    password?: string
    img?: string
    phone?: number
    bio?: string
}