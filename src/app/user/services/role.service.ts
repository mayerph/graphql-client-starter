import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from '../models/role.model';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { ROLES_QUERY } from './gql'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apollo: Apollo) { }

  getRoles(): Observable<Role[]> {
    return this.apollo.watchQuery({ query: ROLES_QUERY })
    .valueChanges
    .pipe(
      map((result: any) => {
        return result.data.roles
      })
    )
  }
}
