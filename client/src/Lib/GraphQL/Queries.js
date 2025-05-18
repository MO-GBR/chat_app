import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query Query {
        getAllUsers {
            unique_id
            username
            email
            user_image
            bio
            chats
            auth_provider_id
            is_active
            time
        }
    }
`;

export const GET_USER = gql`
    query Query {
        passport {
            unique_id
            username
            email
            user_image
            bio
            chats
            auth_provider_id
            is_active
            time
        }
    }
`;

export const GET_ONE_USER = gql`
    query Query($unique_id: ID!) {
        getUserById(unique_id: $unique_id) {
            unique_id
            username
            email
            user_image
            bio
            chats
            auth_provider_id
            is_active
            time
        }
    }
`;

export const GET_MESSAGES = gql`
    query Query($myId: String!, $chatId: String!) {
        getMessages(myId: $myId, chatId: $chatId) {
            chatMessages {
                unique_id
                text
                sender_id
                receiver_id
                image
                time
                created_at
            }
            myMessages {
                unique_id
                text
                sender_id
                receiver_id
                image
                time
                created_at
            }
        }
    }
`;