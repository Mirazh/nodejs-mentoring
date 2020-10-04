import express from 'express';
import HTTP_STATUS from 'http-status';

export const sendError = (res: express.Response, error: {}, status = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
    res.status(status).json({
        success: false,
        ...error
    });
};

export const sendJSON = (res: express.Response, data = {}, status = HTTP_STATUS.OK) => {
    res.status(status).json({
        success: true,
        ...data
    });
};
