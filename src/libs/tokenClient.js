import jwt from 'jsonwebtoken';

export async function generate(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
}

export async function verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}