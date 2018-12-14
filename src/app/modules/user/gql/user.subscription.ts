import gql from 'graphql-tag';
import { USER_FRAGMENTS } from './user.fragment';



const USER_CREATED_SUBSCRIPTION = gql`
           subscription userCreated {
                userCreated {
                    ...defaultFields
                }
            }
            ${ USER_FRAGMENTS.defaultFields }`

const USER_DELETED_SUBSCRIPTION = gql`
           subscription userDeleted {
                userDeleted
            }`

const USER_UPDATED_SUBSCRIPTION = gql`
           subscription userUpdated {
                userUpdated {
                    ...defaultFields
                }
            }
            ${ USER_FRAGMENTS.defaultFields }`

export { USER_CREATED_SUBSCRIPTION, USER_DELETED_SUBSCRIPTION, USER_UPDATED_SUBSCRIPTION }
