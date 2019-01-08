import { NgModule } from '@angular/core'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from 'apollo-link-ws'
import { split, from, ApolloLink } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { HttpHeaders } from '@angular/common/http'
import { environment } from '../environments/environment'

const baseUrl = environment.baseUrl
const uri = 'http://' + baseUrl + ':8000/graphql' // <-- add the URL of the GraphQL server here

const uploadLink = createUploadLink({
    uri,
})

const wsLink = new WebSocketLink({
    uri: 'ws://' + baseUrl + ':8000/graphql',
    options: {
        reconnect: true,
        connectionParams: () => {
            return { authentication: localStorage.getItem('token') }
        },
    },
})

const authUpload = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    if (!token) {
        return {}
    } else {
        return {
            headers: { authentication: token },
        }
    }
})

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    authUpload.concat(uploadLink)
)

export function createApollo(httpLink: HttpLink) {
    const apollo = {
        link: link,
        cache: new InMemoryCache(),
        errorPolicy: 'all',
    }

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
