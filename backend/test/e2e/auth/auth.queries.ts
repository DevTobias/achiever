import { gql } from '@trophoria/test/e2e/e2e-utils';

export const signUpQuery = gql`
  mutation SignUp($user_input: UserCreateInput!) {
    sign_up(user_input: $user_input) {
      createdAt
      email
      payload
      updatedAt
      username
      isVerified
    }
  }
`;
