import gql from 'graphql-tag';
import { PRODUCT_FRAGMENTS } from './product.fragment'


const PRODUCTS_QUERY = gql`
           query getProducts {
                products {
                    ...productDefaultFields
                }
            }
            ${ PRODUCT_FRAGMENTS.productDefaultFields }`


export { PRODUCTS_QUERY }
