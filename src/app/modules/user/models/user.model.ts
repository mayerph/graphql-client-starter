import { Role } from '../../role/models/role.model';
import { Image } from '../../image/models/image.model'

export class User {
    _id?: string
    id: string
    username: string
    password: string
    email: string
    role: Role
    img?: Image
}