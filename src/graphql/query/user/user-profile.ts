import { gql } from '@apollo/client';

export const QUERY_USER_PROFILE = gql`
query userProfile ($userToken: String!){
  userProfile(userToken: $userToken) {
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