export const AuthTypeDef = `#graphql
    type AuthResponse {
        data: User
        message: String
        token: String
        status: Boolean
        time: String
    }

    type Response {
        message: String
        status: Boolean
    }

    input SingUpInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
        bio: String
        user_image: String
        auth_provider_id: String
    }

    input LoginInput {
        email: String!
        password: String!
    }
    
    input ResetPasswordInput {
        resetToken: String!
        password: String!
        confirmPassword: String!
    }

    type Mutation {
        signUp(input: SingUpInput!): AuthResponse
        login(input: LoginInput!): AuthResponse
        logout: Response
        sendResetPasswordEmail(email: String!): Response
        resetPassword(input: ResetPasswordInput!): Response
    }
`;