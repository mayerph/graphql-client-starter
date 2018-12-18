import gql from 'graphql-tag'

const PRODUCT_FRAGMENTS = {
    productDefaultFields: gql`
        fragment productDefaultFields on Product {
            id
            topic {
                id
                name
                description
            }
            stock
            name
            description
            price
            categories {
                id
                name
                description
            }
            gender
            img {
                id
                mimeType
                source
            }
        }
    `,
}

export { PRODUCT_FRAGMENTS }
