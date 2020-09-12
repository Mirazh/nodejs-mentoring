import { User } from './model';
import HTTP_STATUS from 'http-status';
import express from 'express';
import { Service } from './service';
import { OrderType } from './Types';

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const user: User|null = await Service.findUserById(req.params.id);

        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false
            });
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            error
        });
    }
};

export const createUser = async (req: express.Request, res: express.Response) => {
    try {
        const user: User|null = await Service.createUser(req.body);

        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false
            });
        }

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            error
        });
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        await Service.updateUser(req.params.id, req.body);

        res.status(HTTP_STATUS.OK).json({
            success: true
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            error
        });
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const user: User|null = await Service.findUserById(req.params.id);

        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false
            });
        }

        user.is_deleted = true;

        await Service.updateUser(req.params.id, user);

        res.status(HTTP_STATUS.OK).json({
            success: true
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            error
        });
    }
};

export const getAutoSuggestUsers = async (req: express.Request, res: express.Response) => {
    try {
        // @ts-ignore
        const loginSubstring: string = req.query.login_substring;
        // @ts-ignore
        const limit: number = Number(req.query.limit);
        const order: OrderType = { field: 'login', type: 'ASC' };
        const suggestedUsers: Array<User>|null = await Service.findAllUsersByLoginLike(loginSubstring, order, limit);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: suggestedUsers
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            error
        });
    }
};
