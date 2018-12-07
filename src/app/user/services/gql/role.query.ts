import gql from 'graphql-tag';


const rolesQuery = gql`
           query getRoles {
                roles {
                    id
                    name
                }
            }`


export { rolesQuery }
