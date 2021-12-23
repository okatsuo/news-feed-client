import { gql } from '@apollo/client';

export const QUERY_ALL_POSTS = gql`
query {
  posts {
    id
    text
    imageUrl
    user {
      id
      name
      picture
    }
    created_at
    updated_at
  }
}
`