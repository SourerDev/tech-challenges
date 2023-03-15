import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) res.status(401).json({ message: 'Authentication token not provided.' });
    else jwt.verify(token, process.env.SECRET_KEY as string, (err, _user) => {
        if (err) res.status(403).json({ message: 'invalid token' });
        else next();
    });
}

export function handleJwtError(err: Error, _req: Request, res: Response, next: NextFunction) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ message: 'Token no válido' });
    } else {
      next(err);
    }
  }
