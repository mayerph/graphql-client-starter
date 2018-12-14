import { Injectable } from '@angular/core';

import { Observable, of, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Apollo, QueryRef } from 'apollo-angular';
import { map, catchError } from 'rxjs/operators';

import {
  USERS_QUERY,
  USER_QUERY,
  UPDATE_USER_MUTATION,
  DELETE_USER_MUTATION,
  CREATE_USER_MUTATION,
  USER_CREATED_SUBSCRIPTION,
  USER_DELETED_SUBSCRIPTION,
  USER_UPDATED_SUBSCRIPTION } from '../gql'
import { MessageService } from 'src/app/modules/message/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCreatedSubscription: Subscription;
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

  subscribeUserCreated(): Observable<any> {
    return this.apollo.subscribe({ query: USER_CREATED_SUBSCRIPTION })
  }

  subscribeUserDeleted(): Observable<any> {
    return this.apollo.subscribe({ query: USER_DELETED_SUBSCRIPTION })
  }

  subscribeUserUpdated(): Observable<any> {
    return this.apollo.subscribe({ query: USER_UPDATED_SUBSCRIPTION })
  }

  createMessage(err): void {
    this.messageService.displayMessage({
      level: 'error',
      title: 'Error',
      message: err.message || 'server error. please try again'
    })
  }

  updateUser(id: string, username: string, email: string, role: string, image: Blob) {
    //const file = new Blob(['Foo.'], { type: 'text/plain' })
    this.apollo.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        id,
        username,
        email,
        role,
        image
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

  addUser(username: string, email: string, role: string, image: Blob) {
    //const file = new Blob(['Foo.'], { type: 'text/plain' })
    console.log(username, email, role, image)
    const password = 'sterne123'
    this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        username,
        email,
        role,
        password,
        image
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
