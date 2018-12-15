import { Injectable } from '@angular/core';

import { Observable, of, Subscription, throwError } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCreatedSubscription: Subscription;
  constructor(
    private apollo: Apollo
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
      catchError((error) => {
        return throwError(error)
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

  updateUser(id: string, username: string, email: string, role: string, image: Blob, password: string): Observable<any> {
    //const file = new Blob(['Foo.'], { type: 'text/plain' })
    return this.apollo.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        id,
        username,
        email,
        role,
        image,
        password
      }
    }).pipe(
      map(({errors, data}) => {
        if (errors) {
          throw errors[0]
        }
        return data
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  addUser(username: string, email: string, role: string, image: Blob, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        username,
        email,
        role,
        password,
        image
      }
    }).pipe(
      map(({errors, data}) => {
        if (errors) {
          throw errors[0]
        }
        console.log(data)
        return data
      }),
      catchError((error) => {
        return throwError(error)
      })
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
      catchError((error) => {
        return throwError(error)
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
      catchError((error) => {
        return throwError(error)
      })
    )
  }
}
