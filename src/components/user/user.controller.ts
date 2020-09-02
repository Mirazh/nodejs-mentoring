import { User } from './model';
import HTTP_STATUS from 'http-status';
import express from 'express';
import { Op } from 'sequelize';

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        // need to extract to service
        const user = await User
            .findOne({
                where: {
                    id: req.params.id
                },
                raw: true
            });

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
        const user = await User.create(req.body);

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
        // need to extract to service
        const user = await User
            .findOne({
                where: {
                    id: req.params.id
                },
                raw: true
            });

        await User.update({ ...user, ...req.body }, {
            where: {
                id: req.params.id
            }
        });

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
        // need to extract to service
        const user = await User
            .findOne({
                where: {
                    id: req.params.id
                },
                raw: true
            });

        await User.update({ ...user, is_deleted: true }, {
            where: {
                id: req.params.id
            }
        });

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

        const suggestedUsers = await User.findAll({
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            },
            order: [
                ['login', 'ASC']
            ],
            limit
        });

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
