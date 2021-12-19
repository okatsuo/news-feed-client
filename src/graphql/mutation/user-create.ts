import { gql } from '@apollo/client';

export const MUTATION_USER_CREATE = gql`
  mutation userCreate($email: String!, $password: String!, $name: String!){
  userCreate(
    fields: { email: $email, password: $password, name: $name }
  ) {
    name
  }
}
`