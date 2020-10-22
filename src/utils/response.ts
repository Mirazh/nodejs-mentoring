import express from 'express';
import HTTP_STATUS from 'http-status';

type customError = {
    message?: string,
    method?: string,
    params?: {
        req?: express.Request,
        body?: Object,
        params?: Object,
        query?: Object,
    },
}

export const sendError = (res: express.Response, error: customError, status = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
    if (error.params && error.params.req) {
        const { body, params, query } = error.params.req;

        delete error.params.req;
        error.params = { ...error.params, body, params, query };
    }

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
