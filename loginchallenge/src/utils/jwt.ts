import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateToken(payload: any): string {
    const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
      expiresIn: '1h'
    });
    return token;
}