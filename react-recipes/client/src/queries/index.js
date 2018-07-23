import { gql } from 'apollo-boost';

export const GET_ALL_RECIPES = gql`
    query GetAllRecipesQuery {
        getAllRecipes {
            name
            description
            instructions
            category
            likes
            createdDate
        }
    }
`;



/* User Mutations */

export const SIGNIN_USER = gql`
    mutation SigninUserMutation($signinUserInput: SigninUserInput) {
        signinUser(signinUserInput: $signinUserInput) {
            token
        }
}
`;

export const SIGNUP_USER = gql`
    mutation SignupUserMutation($signupUserInput: SignupUserInput) {
        signupUser(signupUserInput: $signupUserInput) {
            token
        }
    }
`;