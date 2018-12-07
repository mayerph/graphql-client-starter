import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

const ELEMENT_DATA = [
  {id: "1", username: 'kyloren', email: 'kylo@hm.edu', role: 'admin'},
  {id: "2", username: 'vader', email: 'vader@hm.edu', role: 'admin'},
  {id: "3", username: 'solo', email: 'solo@hm.edu', role: 'admin'},
  {id: "4", username: 'skywalker', email: 'skywalker@hm.edu', role: 'admin'},
  {id: "4", username: 'skywalker', email: 'skywalker@hm.edu', role: 'admin'},
  {id: "4", username: 'skywalker', email: 'skywalker@hm.edu', role: 'admin'},
  {id: "4", username: 'skywalker', email: 'skywalker@hm.edu', role: 'admin'},
  {id: "4", username: 'skywalker', email: 'skywalker@hm.edu', role: 'admin'},
  {id: "4", username: 'skywalker', email: 'skywalker@hm.edu', role: 'admin'},
  {id: "4", username: 'skywalker', email: 'skywalker@hm.edu', role: 'admin'},
  {id: "4", username: 'skywalker', email: 'skywalker@hm.edu', role: 'admin'},
  {id: "4", username: 'skywalker', email: 'skywalker@hm.edu', role: 'admin'},
  {id: "4", username: 'skywalker', email: 'skywalker@hm.edu', role: 'admin'},
  {id: "4", username: 'skywalker', email: 'skywalker@hm.edu', role: 'admin'},
];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: any;
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) { }

  getUsers(): Observable<User[]> {
    // TODO: send the message _after_ fetching the heroes
    const allUsers = this.apollo.watchQuery({
      query: gql`
        {
          users {
            id
            username
            email
            role {
              name
            }
          }
        }
      `
    })
    .valueChanges
    .pipe(
      map((result: any) => {
        this.users = result.data.users
        return this.users
      })
    );
    return allUsers;
  }

  getUser(id: string): Observable<User> {
    return of(this.users.find(user => user.id === id));
  }
}
