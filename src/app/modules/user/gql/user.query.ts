import gql from 'graphql-tag';
import { USER_FRAGMENTS } from './user.fragment'


const USERS_QUERY = gql`
           query getUsers {
                users {
                    ...defaultFields
                    img {
                        name
                        mimeType
                        source
                    }
                }
            }
            ${ USER_FRAGMENTS.defaultFields }`

const USER_QUERY = gql`
           query getUser($id: ID!) {
                user(id: $id) {
                    ...defaultFields
                    img {
                        name
                        mimeType
                        source
                    }
                }
            }
            ${ USER_FRAGMENTS.defaultFields }`

export { USERS_QUERY, USER_QUERY }
