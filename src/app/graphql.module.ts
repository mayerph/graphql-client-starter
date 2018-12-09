import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { Message } from './message/models/message.mode';
import { createUploadLink } from 'apollo-upload-client'


const uri = 'http://localhost:8000/graphql'; // <-- add the URL of the GraphQL server here

const link = createUploadLink({uri})

export function createApollo(httpLink: HttpLink) {
  const apollo = {
    link,
    cache: new InMemoryCache(),
    errorPolicy: 'all'
  };

  return apollo
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
