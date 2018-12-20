import { TestBed } from '@angular/core/testing'

import { AuthService } from './auth.service'
import { GraphQLErrors } from 'graphql'

import {
    ApolloTestingModule,
    ApolloTestingController,
} from 'apollo-angular/testing'

import { Apollo } from 'apollo-angular'
import { Router } from '@angular/router'
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from '../gql'

describe('AuthService', () => {
    let backend: ApolloTestingController
    let service: AuthService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ApolloTestingModule],
            providers: [Apollo, { provide: Router, useClass: RouterStub }],
        })

        backend = TestBed.get(ApolloTestingController)
        service = new AuthService(TestBed.get(Apollo), TestBed.get(Router))
    })

    afterEach(() => {
        backend.verify()
    })

    it('signIn with valid credentials', done => {
        const mockToken = {
            data: {
                signIn: {
                    token: '123',
                },
            },
        }
        service.signin('username', 'password').subscribe(
            result => {
                expect(result).toEqual('123')
                done()
            },
            error => {
                fail('result expected')
                done()
            }
        )
        backend.expectOne(SIGNIN_MUTATION).flush(mockToken)
    })

    it('signUp with valid credentials', done => {
        const mockToken = {
            data: {
                signUp: {
                    token: '123',
                },
            },
        }
        service.signup('username', 'email', 'password').subscribe(
            result => {
                expect(result).toEqual('123')
                done()
            },
            error => {
                fail('result expected')
                done()
            }
        )
        backend.expectOne(SIGNUP_MUTATION).flush(mockToken)
    })

    it('signIn error handling', done => {
        service.signin('username', 'password').subscribe(
            result => {
                fail('error expected')
                done()
            },
            error => {
                expect(error).not.toBeNull()
                done()
            }
        )
        backend
            .expectOne(SIGNIN_MUTATION)
            .networkError(new Error('Network Error'))
    })
})

class ApolloStub {}

class RouterStub {}
