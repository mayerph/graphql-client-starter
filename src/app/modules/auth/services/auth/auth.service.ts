import { Injectable } from '@angular/core'
import { SIGNUP_MUTATION, SIGNIN_MUTATION } from '../../gql'
import { Apollo } from 'apollo-angular'
import { MessageService } from '../../../message/services/message.service'
import { map, catchError } from 'rxjs/operators'
import { Observable, throwError, Subject } from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt'
import { User } from 'src/app/modules/user/models/user.model'
import { Router } from '@angular/router'
import { Permission } from 'src/app/modules/role/models/permission.model'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    helper = new JwtHelperService()
    authChange = new Subject<boolean>()

    constructor(private apollo: Apollo, private router: Router) {}

    signup(username: string, email: string, password: string): Observable<any> {
        return this.apollo
            .mutate({
                mutation: SIGNUP_MUTATION,
                variables: {
                    username,
                    email,
                    password,
                },
            })
            .pipe(
                map(({ errors, data }: any) => {
                    if (errors) {
                        throw errors[0]
                    }
                    const token = data.signUp.token
                    this.setToken(token)
                    return token
                }),
                catchError(error => {
                    return throwError(error)
                })
            )
    }

    signin(username: string, password: string): Observable<any> {
        return this.apollo
            .mutate({
                mutation: SIGNIN_MUTATION,
                variables: {
                    username,
                    password,
                },
            })
            .pipe(
                map(({ errors, data }: any) => {
                    if (errors) {
                        throw errors[0]
                    }
                    const token = data.signIn.token
                    this.setToken(token)
                    return token
                }),
                catchError(error => {
                    return throwError(error)
                })
            )
    }

    logout(): void {
        localStorage.removeItem('token')
        this.router.navigate(['/signin'])
    }

    setToken(token): void {
        localStorage.setItem('token', token)
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token')
        return !this.helper.isTokenExpired(token)
    }

    decodeToken(): User {
        const token = localStorage.getItem('token')
        const decodedToken = this.helper.decodeToken(token)
        return decodedToken
    }


    isAuthorized(permissions: string[]): boolean {
        const user = this.decodeToken()
        const userPermissions = user ? user.role.permissions : []
        if (
            !this.isAuthenticated() ||
            permissions.every(p => userPermissions.every(uP => p !== uP.name))
        ) {
            return false
        } else {
            return true
        }
    }
}
