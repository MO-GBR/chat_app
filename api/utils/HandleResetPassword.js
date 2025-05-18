import { User } from "../database/models/User.js";
import { randomBytes, createHash } from 'node:crypto';
import { ErrorResponse } from "./HandleResponse.js";
import { formatter } from "./HandleDateAndTime.js";

export const getResetPasswordToken = async (id) => {
    const resetToken = randomBytes(20).toString("hex");
    const resetPasswordToken = createHash("sha256").update(resetToken).digest("hex");
    const resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    try {
        const formattedDate = formatter.format(resetPasswordExpire);
        console.log('first', formattedDate);
        const updates = {
            reset_password_token: resetPasswordToken,
            reset_password_expire: formattedDate
        };
        
        await User.updateById(id, "users", updates);
    } catch (error) {
        const err = new ErrorResponse(error.message, 400);
        console.log("Error in reset password process >>>", err);
    }
    return resetToken;
};

export const resetTokenValue = (resetToken) => {
    return createHash("sha256").update(resetToken).digest("hex");
};
