export const LoginInput = (email, password) => {
    return {
        variables: {
            input: {
                email,
                password
            }
        }
    };
};

export const ResetPasswordInput = (resetToken, password, confirmPassword) => {
    return {
        variables: {
            input: {
                resetToken,
                password,
                confirmPassword
            }
        }
    };
};

export const MessageInput = (sender_id, receiver_id, text, image) => {
    return {
        variables: {
            input: {
                sender_id,
                receiver_id,
                text,
                image
            }
        }
    };
};

export const SingUpInput = (username, email, password, confirmPassword, user_image, bio, auth_provider_id) => {
    return {
        variables: {
            input: {
                username,
                email,
                password,
                confirmPassword,
                user_image,
                bio,
                auth_provider_id
            }
        }
    };
};

export const UpdateUserInput = (unique_id, is_active, username, email, user_image, bio) => {
    return {
        variables: {
            input: {
                unique_id,
                username,
                email,
                user_image,
                bio,
                is_active
            }
        }
    };
};

export const GetMessageInput = (myId, chatId) => {
    return {
        variables: {
            myId,
            chatId
        }
    };
}