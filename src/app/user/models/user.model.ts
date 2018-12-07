import { Role } from './role.model';

export class User {
    id?: any
    username: string
    password: string
    email: string
    role: Role
    img?: any
}