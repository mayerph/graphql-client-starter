import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { Apollo } from 'apollo-angular';
import { PRODUCTS_QUERY } from '../gql';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apollo: Apollo) { }

  getProducts(): Observable<Product[]> {
    return this.apollo.watchQuery({ query: PRODUCTS_QUERY, errorPolicy: 'all' })
    .valueChanges
    .pipe(
      map(({errors, data}: any) => {
        if (errors) {
          throw errors[0]
        }
        const products = data.products
        return products
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }
}
