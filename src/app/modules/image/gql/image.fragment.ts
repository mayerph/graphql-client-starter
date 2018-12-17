import gql from 'graphql-tag';


const IMAGE_FRAGMENTS = {
  imageDefaultFields: gql`
    fragment imageDefaultFields on File {
        id
        name
        mimeType
        source
    }`
}

export { IMAGE_FRAGMENTS}