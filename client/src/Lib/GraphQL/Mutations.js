import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Mutation($input: LoginInput!) {
        login(input: $input) {
            message
            status
            time
            token
            data {
                unique_id
                username
                email
                user_image
                bio
                auth_provider_id
                chats
                is_active
                time
            }
        }
    }
`;

export const LOG_OUT = gql`
    mutation Mutation {
        logout {
            message
            status
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation Mutation($input: ResetPasswordInput!) {
        resetPassword(input: $input) {
            message
            status
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation Mutation($input: MessageInput!) {
        sendMessage(input: $input) {
            unique_id
            text
            sender_id
            receiver_id
            image
            time
        }
    }
`;

export const SEND_EMAIL = gql`
    mutation Mutation($email: String!) {
        sendResetPasswordEmail(email: $email) {
            message
            status
        }
    }
`;

export const SIGNUP = gql`
    mutation Mutation($input: SingUpInput!) {
        signUp(input: $input) {
            message
            status
            time
            token
            data {
                unique_id
                username
                email
                user_image
                bio
                auth_provider_id
                chats
                is_active
                time
            }
        }
    }
`;

export const EDIT_USER = gql`
    mutation Mutation($input: UpdateUserInput!) {
        update(input: $input) {
            unique_id
            username
            email
            user_image
            bio
            auth_provider_id
            chats
            is_active
            time
        }
    }
`;

export const ADD_CHAT = gql`
    mutation Mutation($unique_id: ID!, $chat_id: String!) {
        addPrivateChat(unique_id: $unique_id, chat_id: $chat_id) {
            message
            status
        }
    }
`;