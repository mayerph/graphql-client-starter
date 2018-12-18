import { Observable } from 'rxjs';
export type onSubmit = (
    username: string,
    email: string,
    role: string,
    image: Blob,
    password: string,
    id?: string) => Observable<any>