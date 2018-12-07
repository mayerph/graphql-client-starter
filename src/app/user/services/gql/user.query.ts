import gql from 'graphql-tag';


const usersQuery = gql`
           query getUsers {
                users {
                    id
                    username
                    email
                    role {
                    name
                    }
                }
            }`

const userQuery = gql`
           query getUser($id: ID!) {
                user(id: $id) {
                    id
                    username
                    email
                    role {
                        id
                        name
                    }
                }
            }`

export { usersQuery, userQuery }
