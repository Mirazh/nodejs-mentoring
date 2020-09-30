import { GroupModel } from './model';
import HTTP_STATUS from 'http-status';
import express from 'express';
import { Service } from './service';

export const getGroup = async (req: express.Request, res: express.Response) => {
    try {
        const group: GroupModel|null = await Service.findGroupById(req.params.id);

        if (!group) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false
            });
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: group
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            error
        });
    }
};

export const getAllGroups = async (req: express.Request, res: express.Response) => {
    try {
        const groups: Array<GroupModel>|null = await Service.findAllGroups();

        if (!groups) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false
            });
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: groups
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            error
        });
    }
};

export const createGroup = async (req: express.Request, res: express.Response) => {
    try {
        const group: GroupModel|null = await Service.createGroup(req.body);

        if (!group) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false
            });
        }

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            data: group
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            error
        });
    }
};

export const updateGroup = async (req: express.Request, res: express.Response) => {
    try {
        await Service.updateGroup(req.params.id, req.body);

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

export const deleteGroup = async (req: express.Request, res: express.Response) => {
    try {
        await Service.deleteGroupById(req.params.id);

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
