import jwt from 'jsonwebtoken';
import express from 'express';
import HTTP_STATUS from 'http-status';
import { sendError } from './response';

const SECRET = 'superMegaSecretWord';

export const createToken = (payload: Object) => {
    return jwt.sign(payload, SECRET, { expiresIn: 999999999 });
};

export const checkToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.originalUrl === '/login') {
        return next();
    }

    const token: string|string[]|undefined = req.headers['x-access-token'];

    if (typeof token === 'string' && token) {
        try {
            jwt.verify(token, SECRET);

            return next();
        } catch (error) {
            sendError(res, { message: error.message }, HTTP_STATUS.FORBIDDEN);
        }
    } else {
        return sendError(res, { message: 'No token provided' }, HTTP_STATUS.UNAUTHORIZED);
    }
};
