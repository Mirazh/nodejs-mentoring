import Ajv, { ErrorObject } from 'ajv';
import { userSchema } from '../components/user/user.schema';
import express from 'express';

const ajv = new Ajv({ allErrors: true, removeAdditional: 'all' });
require('ajv-errors')(ajv);

ajv.addSchema(userSchema, 'user');
ajv.addKeyword('validatePassword', {
    validate: (value: any, data: any) => data.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
    errors: true
});

const errorResponse = (schemaErrors: Array<ErrorObject>|null|undefined) => {
    const errors = schemaErrors && schemaErrors.map(error => ({
        path: error.dataPath,
        message: error.message
    }));

    return {
        status: 'failed',
        errors
    };
};

export const validateSchema = (schemaName: string) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const isValid = ajv.validate(schemaName, req.body);

    if (!isValid) {
        res.status(400).json(errorResponse(ajv.errors));
    } else {
        // eslint-disable-next-line callback-return
        next();
    }
};
