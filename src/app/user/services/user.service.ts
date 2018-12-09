import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Apollo } from 'apollo-angular';
import { map, catchError } from 'rxjs/operators';

import { USERS_QUERY, USER_QUERY, UPDATE_USER_MUTATION, DELETE_USER_MUTATION } from './gql'
import { MessageService } from 'src/app/message/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apollo: Apollo,
    private messageService: MessageService
  ) { }

  getUsers(): Observable<User[]> {
    return this.apollo.watchQuery({ query: USERS_QUERY, errorPolicy: 'all' })
    .valueChanges
    .pipe(
      map(({errors, data}: any) => {
        if (errors) {
          throw errors[0]
        }
        const users = data.users
        return users
      }),
      catchError((err) => {
        this.createMessage(err)
        throw err
      })
    )
  }

  createMessage(err): void {
    this.messageService.displayMessage({
      level: 'error',
      title: 'Error',
      message: err.message || 'server error. please try again'
    })
  }

  updateUser(id: string, username: string, email: string, role: string) {
    this.apollo.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        id,
        username,
        email,
        role
      }
    }).subscribe(
      data => {
        console.log(data)
      },
      error => {
        this.createMessage(error)
      }
    )
  }

  deleteUser(id: string): Observable<boolean> {
    return this.apollo.mutate({
      mutation: DELETE_USER_MUTATION,
      variables: {
        id
      }
    })
    .pipe(
      map(({errors, data}) => {
        if (errors) {
          throw errors[0]
        }
        return data.deleteUser
      }),
      catchError((err) => {
        this.createMessage(err)
        throw err
      })
    )
  }

  getUser(id: string): Observable<User> {
    return this.apollo.watchQuery({
      query: USER_QUERY,
      errorPolicy: 'all',
      variables: {
        id
      }
    })
    .valueChanges
    .pipe(
      map(({errors, data}: any) => {
        if (errors) {
          throw errors[0]
        }
        const user = data.user
        return user
      }),
      catchError((err) => {
        this.createMessage(err)
        throw err
      })
    )
  }
}
