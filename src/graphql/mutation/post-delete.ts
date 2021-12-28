import { gql } from '@apollo/client';

export const MUTATION_POST_DELETE = gql`
mutation postDelete($postId: String!) {
  postDelete(postId: $postId) {
    id
    created_at
    imageUrl
    text
    updated_at
  }
}
`