import jwt from 'jsonwebtoken';
import express from 'express';
import HTTP_STATUS from 'http-status';
import { sendError } from './response';

const SECRET = 'superMegaSecretWord';

export const createToken = (payload: Object) => {
    return jwt.sign(payload, SECRET, { expiresIn: 999999999 });
};

export const checkToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, SECRET, (error: Error) => {
            if (error) {
                return sendError(res, { message: error.message }, HTTP_STATUS.FORBIDDEN);
            }

            next();
        });
    } else {
        return sendError(res, { message: 'No token provided' }, HTTP_STATUS.UNAUTHORIZED);
    }
};
