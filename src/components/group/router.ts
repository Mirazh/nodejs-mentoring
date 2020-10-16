import express from 'express';
import { createGroup, deleteGroup, getAllGroups, getGroup, updateGroup } from './controller';

const router = express.Router();

router.route('/group/:id')
    .get((req: express.Request, res: express.Response) => {
        getGroup(req, res);
    })
    .put((req: express.Request, res: express.Response) => {
        updateGroup(req, res);
    })
    .delete((req: express.Request, res: express.Response) => {
        deleteGroup(req, res);
    });

router.route('/group')
    .post((req: express.Request, res: express.Response) => {
        createGroup(req, res);
    })
    .get((req: express.Request, res: express.Response) => {
        getAllGroups(req, res);
    });

export { router as groupRouter };
