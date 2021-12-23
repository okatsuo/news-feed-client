import { gql } from '@apollo/client';

export const QUERY_LOGIN = gql`
query Login ($email: String!, $password: String!){
  login( email: $email, password: $password) {
    token
    user {
      id
      email
      name
      role
      status
      picture
      created_at
      updated_at
    }
  }
}
`