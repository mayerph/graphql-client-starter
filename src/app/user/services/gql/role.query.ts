import gql from 'graphql-tag';


const ROLES_QUERY = gql`
           query getRoles {
                roles {
                    id
                    name
                }
            }`


export { ROLES_QUERY }
