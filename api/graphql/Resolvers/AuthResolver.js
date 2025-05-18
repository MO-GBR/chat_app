import dotenv from "dotenv";

import { User } from "../../database/models/User.js";
import { hashPassword, comparePassword } from "../../utils/handlePassword.js";
import { ErrorResponse, AuthResponse } from "../../utils/HandleResponse.js";
import { createToken } from "../../utils/HandleToken.js";
import { getResetPasswordToken, resetTokenValue } from "../../utils/HandleResetPassword.js";
import { SendEmail } from "../../utils/HandleEmail.js";
import cloudinary from '../../utils/HandleUpload.js';

dotenv.config();

export const AuthResolver = {
    Mutation: {
        signUp: async ( parent, args, context, info ) => {
            const { username, email, password, confirmPassword, user_image, bio, auth_provider_id } = args.input;

            try {
                if (!username || !email || !password) return new AuthResponse(null, null, "Missing required fields", false);
                if (username.length < 3) return new AuthResponse(null, null, "Username must be at least 3 characters", false);
                if (password.length < 6) return new AuthResponse(null, null, "Password must be at least 6 characters", false);
                if (password !== confirmPassword) return new AuthResponse(null, null, "Passwords do not match", false);

                const find = {
                    username: username,
                    email: email
                };

                const existUser = await User.findBy("users", find);

                if (existUser) return new AuthResponse(null, null, "User already exists", false);

                const hashedPassword = hashPassword(password);

                const avatar = user_image ? (await cloudinary.uploader.upload(user_image)).secure_url : 'https://avatar.iran.liara.run/public/boy';

                const newUser = new User(username, email, hashedPassword, avatar, bio, auth_provider_id);

                const savedUser = await newUser.save("users");

                if (!savedUser) return new AuthResponse(null, null, "Error creating user", false);

                const { password: _, ...userWithoutPassword } = savedUser;

                const accessToken = createToken(userWithoutPassword, context.res);

                console.log('User created successfully >>>', savedUser);
                
                return new AuthResponse(userWithoutPassword, accessToken, "User created successfully", true);
            } catch (error) {
                const err = new ErrorResponse(`Error fetching Signup resolver: ${error.message}`, 500);
                console.error(err);
            }
        },

        login: async ( parent, args, context, info ) => {
            const { email, password } = args.input;

            try {
                if (!email || !password) return new AuthResponse(null, null, "Missing required fields", false);

                const find = {
                    email: email
                };

                const user = await User.findBy("users", find);

                if (!user) return new AuthResponse(null, null, "User not found", false);

                const isMatch = comparePassword(password, user.password);

                if (!isMatch) return new AuthResponse(null, null, "Invalid credentials", false);

                const { password: _, ...userWithoutPassword } = user;

                const accessToken = createToken(userWithoutPassword, context.res);

                console.log('Login successful >>>', userWithoutPassword);

                return new AuthResponse(userWithoutPassword, accessToken, "Login successful", true);
            } catch (error) {
                const err = new ErrorResponse(`Error fetching Login resolver: ${error.message}`, 500);
                console.error(err);
            }
        },
        
        sendResetPasswordEmail: async ( parent, args, context, info ) => {
            const { email } = args;
            try {
                if (!email) return new AuthResponse(null, null, "Missing required fields", false);

                const find = {
                    email: email
                };

                const user = await User.findBy("users", find);

                if (!user) return new AuthResponse(null, null, "Please write your correct email", false);

                const ApplyResetPasswordToken = await getResetPasswordToken(user.unique_id);

                const resetURL = `${process.env.CLIENT_URL}/resetpassword/${ApplyResetPasswordToken}`;

                const message = `
                   <h1>You have requested a password reset</h1>
                   <p>Please use this link to reset your password</p>
                   <a href = ${resetURL} clicktracking = off>CLICK HERE</a>
                `;

                try {
                    SendEmail({
                        to: user.email,
                        subject: "Password reset request",
                        text: message
                    });
                } catch (error) {
                    console.error("Error sending email: ", error);
                    return new AuthResponse(null, null, "Error sending email", false);
                };

                console.log("Reset password email sent");

                return {
                    message: "Reset password email sent",
                    status: true
                };

            } catch (error) {
                const err = new ErrorResponse(`Error fetching Forget Password resolver: ${error.message}`, 500);
                console.error(err);
            };
        },

        resetPassword: async ( parent, args, context, info ) => {
            const { resetToken, password, confirmPassword } = args.input;

            try {
                if(!password || !confirmPassword) return new AuthResponse(null, null, "Missing required fields", false);
                if (password.length < 6) return new AuthResponse(null, null, "Password must be at least 6 characters", false);
                if (password !== confirmPassword) return new AuthResponse(null, null, "Passwords do not match", false);

                const token = resetTokenValue(resetToken);

                const find = {
                    reset_password_token: token,
                };

                const user = await User.findBy("users", find);

                if (!user) return new AuthResponse(null, null, "Invalid token", false);

                const hashedPassword = await hashPassword(password);

                try {
                    const updates = {
                        password: hashedPassword,
                        reset_password_token: null,
                        reset_password_expire: null
                    };

                    await User.updateById(user.unique_id, "users", updates);
                } catch (error) {
                    console.error("Error updating password: ", error.message);
                    return new AuthResponse(null, null, "Error updating password", false);
                };

                console.log("Reset password successfuly");

                return {
                    message: "Reset password successfuly",
                    status: true
                };
            } catch (error) {
                const err = new ErrorResponse(`Error fetching Reset Password resolver: ${error.message}`, 500);
                console.error(err);
            };
        },

        logout: async ( parent, args, context, info ) => {
            try {
                context.res.cookie("jwt", "", { maxAge: 0 });
                console.log("Logged out successfully");
                return {
                    message: "Logged out successfully",
                    status: true
                };
            } catch (error) {
                const err = new ErrorResponse(`Error fetching Reset Password resolver: ${error.message}`, 500);
                console.error(err);
            }
        }
    }
};