import { UserModel } from './model';
import HTTP_STATUS from 'http-status';
import express from 'express';
import { Service } from './service';
import { OrderType } from './Types';
import { sendError, sendJSON } from '../../utils/response';

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const user: UserModel|null = await Service.findUserById(req.params.id);

        if (!user) {
            return sendError(res, '', HTTP_STATUS.NOT_FOUND);
        }

        sendJSON(res, { user });
    } catch (error) {
        sendError(res, error);
    }
};

export const createUser = async (req: express.Request, res: express.Response) => {
    try {
        const user: UserModel|null = await Service.createUser(req.body);

        if (!user) {
            return sendError(res, '', HTTP_STATUS.NOT_FOUND);
        }

        sendJSON(res, { user }, HTTP_STATUS.CREATED);
    } catch (error) {
        sendError(res, error);
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        await Service.updateUser(req.params.id, req.body);

        sendJSON(res);
    } catch (error) {
        sendError(res, error);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const user: UserModel|null = await Service.findUserById(req.params.id);

        if (!user) {
            return sendError(res, '', HTTP_STATUS.NOT_FOUND);
        }

        user.is_deleted = true;

        await Service.updateUser(req.params.id, user);

        sendJSON(res);
    } catch (error) {
        sendError(res, error);
    }
};

export const getAutoSuggestUsers = async (req: express.Request, res: express.Response) => {
    try {
        // @ts-ignore
        const loginSubstring: string = req.query.login_substring;
        // @ts-ignore
        const limit: number = Number(req.query.limit);
        const order: OrderType = { field: 'login', type: 'ASC' };
        const suggestedUsers: Array<UserModel>|null = await Service.findAllUsersByLoginLike(loginSubstring, order, limit);

        sendJSON(res, { suggestedUsers });
    } catch (error) {
        sendError(res, error);
    }
};
