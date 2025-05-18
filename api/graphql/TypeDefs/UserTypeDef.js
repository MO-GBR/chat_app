export const UserTypeDef = `#graphql
    type User {
        id: ID
        unique_id: ID
        username: String
        email: String
        password: String
        user_image: String
        bio: String
        auth_provider_id: String
        chats: [String]
        reset_password_token: String
        reset_password_expire: Float
        is_active: Boolean
        time: String
        created_at: String
    }

    type Response {
        message: String
        status: Boolean
    }

    type Query {
        getUserById(unique_id: ID!): User
        getAllUsers: [User]
        passport: User
    }

    input UpdateUserInput {
        unique_id: ID!
        username: String
        email: String
        bio: String
        user_image: String
        is_active: Boolean
    }

    type Mutation {
        update(input: UpdateUserInput!): User
        addPrivateChat(unique_id: ID!, chat_id: String!): Response
    }
`;