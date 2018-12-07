import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Role } from '../models/role.model';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { rolesQuery } from './gql'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apollo: Apollo) { }

  getRoles(): Observable<Role[]> {
    return this.apollo.watchQuery({ query: rolesQuery })
    .valueChanges
    .pipe(
      map((result: any) => {
        return result.data.roles
      })
    )
  }
}
