import { Permission } from './permission.model';

export class Role {
    id: string;
    name: string;
    permissions?: Permission[]
}