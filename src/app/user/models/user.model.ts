import { Role } from './role.model';
import { Image } from './image.model'

export class User {
    id?: any
    username: string
    password: string
    email: string
    role: Role
    img?: Image
}