import { Observable } from 'rxjs';
export type onSubmit = (
    username: string,
    email: string,
    role: string,
    image: Blob,
    password: string,
    deleteImage: boolean,
    id?: string) => Observable<any>