import { Injectable } from '@angular/core';

import { Observable, of, Subscription, throwError, Subject } from 'rxjs';
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
import { PROFILE_QUERY } from '../gql/user.query';
import { UPDATE_PROFILE_MUTATION } from '../gql/user.mutation';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apollo: Apollo
  ) { }

  getUsers(): Observable<User[]> {
    return this.apollo.watchQuery({ query: USERS_QUERY, errorPolicy: 'all', fetchPolicy: 'no-cache' })
    .valueChanges
    .pipe(
      map((result: any) => {
        if (result.errors) {
          throw result.errors[0]
        }
        const users = result.data.users
        return users
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  subscribeUserCreated(): Observable<any> {
    return this.apollo.subscribe({ 
      query: USER_CREATED_SUBSCRIPTION,
      fetchPolicy: 'no-cache'
    })
  }

  subscribeUserDeleted(): Observable<any> {
    return this.apollo.subscribe({ 
      query: USER_DELETED_SUBSCRIPTION,
      fetchPolicy: 'no-cache'
    })
  }

  subscribeUserUpdated(): Observable<any> {
    return this.apollo.subscribe({ 
      query: USER_UPDATED_SUBSCRIPTION
    })
  }

  updateUser(username: string, email: string, role: string, image: Blob, password: string, deleteImage: boolean, id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_USER_MUTATION,
      fetchPolicy: 'no-cache',
      variables: {
        id,
        username,
        email,
        role,
        image,
        password,
        deleteImage
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

  updateProfile(username: string, email: string, role: string, image: Blob, password: string, deleteImage: boolean): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      fetchPolicy: 'no-cache',
      variables: {
        username,
        email,
        role,
        image,
        password,
        deleteImage
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
      fetchPolicy: 'no-cache',
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
      fetchPolicy: 'no-cache',
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
      fetchPolicy: 'no-cache',
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

  getProfile(): Observable<User> {
    return this.apollo.watchQuery({
      query: PROFILE_QUERY,
      errorPolicy: 'all',
      fetchPolicy: 'no-cache'
    })
    .valueChanges
    .pipe(
      map(({errors, data}: any) => {
        if (errors) {
          throw errors[0]
        }
        const user = data.me
        return user
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }
}
