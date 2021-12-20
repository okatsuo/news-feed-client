import {gql} from '@apollo/client'

export const MUTATION_POST_CREATE = gql`
mutation postCreate($userId: String!, $text: String!, $image: Upload) {
  postCreate(
    fields: {
      userId: $userId
      text: $text
      image: $image
    }
  ) {
    id
    text
    created_at
    updated_at
    user {
      email
    }
  }
}
`