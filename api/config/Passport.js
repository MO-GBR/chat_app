import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../database/models/User.js";
import { ErrorResponse } from "../utils/HandleResponse.js";
import { createToken, decodeToken } from "../utils/HandleToken.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findBy("users", { auth_provider_id: profile.id });
                if (existingUser) {
                    return done(null, existingUser);
                };

                const newUser = new User(
                    profile.displayName,
                    profile.emails[0].value,
                    null,
                    profile.photos[0].value,
                    'Hi, Im New Here',
                    profile.id
                );

                const savedUser = await newUser.save("users");

                if (!savedUser) {
                    return done(new ErrorResponse("Error saving user to database", 500), null);
                };

                return done(null, savedUser);
            } catch (error) {
                const err = new ErrorResponse(`Error in Passport JS: ${error.message}`, 500);
                console.error(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.unique_id);
});

passport.deserializeUser(async (unique_id, done) => {
    try {
        const user = await User.findById(unique_id, "users");
        if (!user) {
            return done(new ErrorResponse("User not found", 404), null);
        }
        done(null, user);
    } catch (error) {
        const err = new ErrorResponse(`Error in Passport JS: ${error.message}`, 500);
        console.error(err);
    }
});

export const passportMiddleware = (req, res, next) => {
    const token = createToken(req.user, res);

    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
};

export const protectPassport = (req, res, next) => {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    };

    try {
        const decoded = decodeToken(token);
        req.user = decoded.data;
    } catch (error) {
        console.error("Invalid token:", error.message);
    }

    next();
};