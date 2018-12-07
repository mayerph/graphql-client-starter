import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { usersQuery, userQuery, updateUserMutation, deleteUserMutation } from './gql'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private apollo: Apollo
  ) { }

  getUsers(): Observable<User[]> {
    return this.apollo.watchQuery({ query: usersQuery })
    .valueChanges
    .pipe(
      map((result: any) => {
        return result.data.users
      })
    )
  }

  updateUser(id: string, username: string, email: string, role: string) {
    console.log(username, email, role)
    this.apollo.mutate({
      mutation: updateUserMutation,
      variables: {
        id,
        username,
        email,
        role
      }
    }).subscribe(({data}) => {
      console.log(data)
    })
  }

  deleteUser(id: string): Observable<boolean> {
    return this.apollo.mutate({
      mutation: deleteUserMutation,
      variables: {
        id
      }
    })
    .pipe(
      map(({data}) => {
        return data.deleteUser
      })
    )
  }

  getUser(id: string): Observable<User> {
    return this.apollo.watchQuery({
      query: userQuery,
      variables: {
        id
      }
    })
    .valueChanges
    .pipe(
      map((result: any) => {
        return result.data.user
      })
    )
  }
}
