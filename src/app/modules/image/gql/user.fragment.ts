import gql from 'graphql-tag'

const USER_FRAGMENTS = {
    defaultFields: gql`
        fragment defaultFields on User {
            id
            username
            email
            password
            role {
                id
                name
            }
        }
    `,
}

export { USER_FRAGMENTS }
