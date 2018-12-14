import gql from 'graphql-tag';


const SIGNIN_MUTATION = gql`
           mutation signIn($username: String!, $password: String!) {
                signIn(username: $username, password: $password) {
                    token
                }
            }`

const SIGNUP_MUTATION = gql`
           mutation signUp($username: String!, $email: String!, $password: String!) {
                signUp(username: $username, email: $email, password: $password) {
                    token
                }
            }`


export { SIGNIN_MUTATION, SIGNUP_MUTATION }
