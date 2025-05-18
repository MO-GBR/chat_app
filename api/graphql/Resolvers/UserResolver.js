import { User } from "../../database/models/User.js";
import { ErrorResponse } from "../../utils/HandleResponse.js";
import cloudinary from '../../utils/HandleUpload.js';

export const UserResolver = {
    Query: {
        getUserById: async ( parent, args, context, info ) => {
            const { unique_id } = args;
            try {
                const user = await User.findById(unique_id, "users");

                if (!user) {
                    const err = new ErrorResponse(`User with ID ${unique_id} not found`, 404);
                    console.error(err);
                    return null;
                };

                return user;
            } catch (error) {
                const err = new ErrorResponse(`Error fetching user with ID ${unique_id}: ${error.message}`, 500);
                console.error(err);
            }
        },
        getAllUsers: async ( parent, args, context, info ) => {
            try {
                const users = await User.findAll("users");
                return users;
            } catch (error) {
                const err = new ErrorResponse(`Error fetching all users: ${error.message}`, 500);
                console.error(err);
            }
        },
        passport: async ( parent, args, context, info ) => {
            if (!context.req.user) return null;
            console.log("User from context:", context.req.user);
            const user = await User.findById(context.req.user.unique_id, "users");
            if (!user) {
                const err = new ErrorResponse(`User with ID ${context.req.user.unique_id} not found`, 404);
                console.error(err);
                return null;
            };
            return user;
        },
    },
    Mutation: {
        update: async ( parent, args, context, info ) => {
            const { username, email, user_image, bio, unique_id, is_active } = args.input;

            try {
                if (!username || !email || !bio || !user_image || !unique_id || is_active === undefined) {
                    console.error("Missing field(s):", { username, email, bio, user_image, unique_id, is_active });
                    return {
                        message: "Missing required fields",
                        status: false
                    };
                }
            
                const avatar = user_image === '/icons/camera.svg' ? 'https://avatar.iran.liara.run/public/boy' : (await cloudinary.uploader.upload(user_image)).secure_url;

                const updates = {
                    username: username,
                    email: email,
                    user_image: avatar,
                    bio: bio,
                    is_active: is_active,
                };

                await User.updateById(unique_id, "users", updates);

                const updatedUser = await User.findById(unique_id, "users");

                console.log('User updated successfully:', updatedUser);

                return updatedUser;             

            } catch (error) {
                const err = new ErrorResponse(`Error in update user resolver: ${error.message}`, 500);
                console.error(err);
            }
        },
        addPrivateChat: async ( parent, args, context, info ) => {
            const { unique_id, chat_id } = args;

            try {
                if (!unique_id || !chat_id) {
                    console.error("Missing field(s):", { unique_id, chat_id });
                    return {
                        message: "Missing required fields",
                        status: false
                    };
                }

                const user = await User.findById(unique_id, "users");

                if (!user) {
                    console.error(`User with ID ${unique_id} not found`);
                    return {
                        message: `User with ID ${unique_id} not found`,
                        status: false
                    };
                }

                const userChats = user.chats || [];

                if (user.chats?.includes(chat_id)) {
                    return {
                        message: `Chat with ID ${chat_id} already exists for user ${unique_id}`,
                        status: false
                    };
                }
                  

                const updates = {
                    chats: [...userChats, chat_id]
                };

                const updatedUser = await User.updateById(unique_id, "users", updates);

                console.log('Chat added successfully:', updatedUser);

                return {
                    message: "Chat added successfully",
                    status: true
                };

            } catch (error) {
                const err = new ErrorResponse(`Error in addPrivateChat resolver: ${error.message}`, 500);
                console.error(err);
            }
        }
    }
};