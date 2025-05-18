import { decodeToken } from "../utils/HandleToken.js";

export const GQL_Context = async ({ req, res }) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];

    if (!token) return { user: null };

    try {
        const decoded = decodeToken(token);
        return { user: decoded, req, res };
    } catch (error) {
        console.error("Invalid token:", err.message);
        return { user: null, req, res };
    }
};