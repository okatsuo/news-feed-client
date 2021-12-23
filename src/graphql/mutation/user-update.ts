import { gql } from '@apollo/client';
// TODO create a fragment that contains basic user information
export const MUTATION_USER_UPDATE = gql`
mutation userUpdate($userId: String!, $fields: UserUpdateInput! ){
  userUpdate(
    fields: $fields
    userId: $userId
  ) {
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
`