import gql from 'graphql-tag';


const updateUserMutation = gql`
           mutation updateUser($id: ID!, $username: String, $email: String, $role: ID) {
                updateUser(id: $id, username: $username, email: $email, role: $role) {
                    id
                    username
                    email
                    role {
                        id
                        name
                    }
                }
            }`

const deleteUserMutation = gql`
           mutation deleteUser($id: ID!) {
                deleteUser(id: $id)
            }`

export { updateUserMutation, deleteUserMutation }
