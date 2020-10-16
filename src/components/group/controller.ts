import { GroupModel } from './model';
import HTTP_STATUS from 'http-status';
import express from 'express';
import { Service } from './service';
import { sendJSON, sendError } from '../../utils/response';

export const getGroup = async (req: express.Request, res: express.Response) => {
    try {
        const group: GroupModel|null = await Service.findGroupById(req.params.id);

        if (!group) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false
            });
        }

        sendJSON(res, { group });
    } catch (error) {
        sendError(res, { message: error.message, method: 'getGroup', params: { req } });
    }
};

export const getAllGroups = async (req: express.Request, res: express.Response) => {
    try {
        const groups: Array<GroupModel>|null = await Service.findAllGroups();

        if (!groups) {
            return sendError(res, {}, HTTP_STATUS.NOT_FOUND);
        }

        sendJSON(res, { groups });
    } catch (error) {
        sendError(res, { message: error.message, method: 'getAllGroups', params: { req } });
    }
};

export const createGroup = async (req: express.Request, res: express.Response) => {
    try {
        const group: GroupModel|null = await Service.createGroup(req.body);

        if (!group) {
            return sendError(res, {}, HTTP_STATUS.NOT_FOUND);
        }

        sendJSON(res, { group }, HTTP_STATUS.CREATED);
    } catch (error) {
        return sendError(res, { message: error.message, method: 'createGroup', params: { req } });
    }
};

export const updateGroup = async (req: express.Request, res: express.Response) => {
    try {
        await Service.updateGroup(req.params.id, req.body);

        sendJSON(res);
    } catch (error) {
        sendError(res, { message: error.message, method: 'updateGroup', params: { req } });
    }
};

export const deleteGroup = async (req: express.Request, res: express.Response) => {
    try {
        await Service.deleteGroupById(req.params.id);

        sendJSON(res);
    } catch (error) {
        sendError(res, { message: error.message, method: 'deleteGroup', params: { req } });
    }
};
