export const MessageTypeDef = `#graphql
    type Message {
        id: ID
        unique_id: ID!
        sender_id: String!
        receiver_id: String!
        text: String!
        image: String
        time: String!
        created_at: String
    }

    input MessageInput {
        sender_id: String!
        receiver_id: String!
        text: String!
        image: String
    }

    type Chat {
        myMessages: [Message]
        chatMessages: [Message]
    }

    type Query {
        getMessages(myId: String!, chatId: String!): Chat
    }

    type Mutation {
        sendMessage(input: MessageInput!): Message
    }
`;