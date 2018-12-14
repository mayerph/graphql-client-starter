import { Injectable } from '@angular/core';
import { SIGNUP_MUTATION, SIGNIN_MUTATION } from '../../gql'
import { Apollo } from 'apollo-angular';
import { MessageService } from '../../../message/services/message.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apollo: Apollo,
    private messageService: MessageService
  ) { }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: {
        username,
        email,
        password,
      }
    }).pipe(
      map(({errors, data}: any) => {
        if (errors) {
          throw errors[0]
        }
        const token = data.signUp.token
        localStorage.setItem('token', token)
        return token
      }),
      catchError((err) => {
        this.messageService.createMessage(err)
        throw err
      })
    )
  }

  signin(username: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: SIGNIN_MUTATION,
      variables: {
        username,
        password,
      }
    }).pipe(
      map(({errors, data}: any) => {
        if (errors) {
          throw errors[0]
        }
        const token = data.signIn.token
        localStorage.setItem('token', token)
        return token
      }),
      catchError((err) => {
        this.messageService.createMessage(err)
        throw err
      })
    )
  }
}
