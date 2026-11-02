import {SignJWT, jwtVerify} from "jose";
import "dotenv/config";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

export const generateToken = async (payload) => {
    const alg = "HS256";
    const token = await new SignJWT({payload})
        .setProtectedHeader({alg})
        .setExpirationTime(process.env.JWT_EXPIRES_IN)
        .setIssuedAt()
        .sign(secret);
    return token;
};

export const verifyToken = async (token) => {
    const {payload} = await jwtVerify(token, secret);
    return payload;
};

export const verifyRefreshToken = async (token) => {
    const {payload} = await jwtVerify(token, refreshSecret);
    return payload;
};

export const generateRefreshToken = async (payload) => {
    const alg = "HS256";
    const token = await new SignJWT({payload})
        .setProtectedHeader({alg})
        .setExpirationTime(process.env.JWT_REFRESH_EXPIRES_IN)
        .setIssuedAt()
        .sign(refreshSecret);
    return token;
};