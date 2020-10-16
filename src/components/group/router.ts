import express from 'express';
import { createGroup, deleteGroup, getAllGroups, getGroup, updateGroup } from './controller';
import { checkToken } from '../../utils/authentication';

const router = express.Router();

router.route('/group/:id')
    .get(checkToken, (req: express.Request, res: express.Response) => {
        getGroup(req, res);
    })
    .put(checkToken, (req: express.Request, res: express.Response) => {
        updateGroup(req, res);
    })
    .delete(checkToken, (req: express.Request, res: express.Response) => {
        deleteGroup(req, res);
    });

router.route('/group')
    .post(checkToken, (req: express.Request, res: express.Response) => {
        createGroup(req, res);
    })
    .get(checkToken, (req: express.Request, res: express.Response) => {
        getAllGroups(req, res);
    });

export { router as groupRouter };
