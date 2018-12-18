import gql from 'graphql-tag'
import { USER_FRAGMENTS } from './user.fragment'

const UPDATE_USER_MUTATION = gql`
    mutation updateUser(
        $id: ID!
        $username: String
        $email: String
        $role: ID
        $image: Upload
        $password: String
        $deleteImage: Boolean
    ) {
        updateUser(
            id: $id
            username: $username
            email: $email
            role: $role
            img: $image
            password: $password
            deleteImage: $deleteImage
        ) {
            ...defaultFields
        }
    }
    ${USER_FRAGMENTS.defaultFields}
`

const UPDATE_PROFILE_MUTATION = gql`
    mutation updateMe(
        $username: String
        $email: String
        $role: ID
        $image: Upload
        $password: String
        $deleteImage: Boolean
    ) {
        updateMe(
            username: $username
            email: $email
            role: $role
            img: $image
            password: $password
            deleteImage: $deleteImage
        ) {
            ...defaultFields
        }
    }
    ${USER_FRAGMENTS.defaultFields}
`

const CREATE_USER_MUTATION = gql`
    mutation createUser(
        $username: String!
        $email: String!
        $role: ID!
        $password: String!
        $image: Upload
    ) {
        createUser(
            username: $username
            email: $email
            role: $role
            img: $image
            password: $password
        ) {
            ...defaultFields
        }
    }
    ${USER_FRAGMENTS.defaultFields}
`

const DELETE_USER_MUTATION = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id)
    }
`

export {
    UPDATE_USER_MUTATION,
    DELETE_USER_MUTATION,
    CREATE_USER_MUTATION,
    UPDATE_PROFILE_MUTATION,
}
