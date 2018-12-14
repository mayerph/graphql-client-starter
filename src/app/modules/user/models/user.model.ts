import { Role } from '../../role/models/role.model';
import { Image } from '../../image/models/image.model'

export class User {
    id?: any
    username: string
    password: string
    email: string
    role: Role
    img?: Image
}