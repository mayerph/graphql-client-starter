import gql from 'graphql-tag'
import { IMAGE_FRAGMENTS } from '../../image/gql/image.fragment'

const USER_FRAGMENTS = {
    defaultFields: gql`
        fragment defaultFields on User {
            id
            username
            email
            role {
                id
                name
            }
        }
    `,
    userImage: gql`
        fragment userImage on User {
            img {
                ...imageDefaultFields
            }
        }
        ${IMAGE_FRAGMENTS.imageDefaultFields}
    `,
}

export { USER_FRAGMENTS }
