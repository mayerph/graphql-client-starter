import gql from 'graphql-tag';
import { USER_FRAGMENTS } from './user.fragment'


const USERS_QUERY = gql`
           query getUsers {
                users {
                    ...defaultFields
                    ...userImage
                }
            }
            ${ USER_FRAGMENTS.defaultFields }
            ${ USER_FRAGMENTS.userImage }`

const USER_QUERY = gql`
           query getUser($id: ID!) {
                user(id: $id) {
                    ...defaultFields
                    ...userImage
                }
            }
            ${ USER_FRAGMENTS.defaultFields }
            ${ USER_FRAGMENTS.userImage }`

export { USERS_QUERY, USER_QUERY }
