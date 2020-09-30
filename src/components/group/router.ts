import express from 'express';
import { createGroup, deleteGroup, getAllGroups, getGroup, updateGroup } from './controller';

const router = express.Router();

router.route('/group/:id')
    .get(async (req: express.Request, res: express.Response) => {
        await getGroup(req, res);
    })
    .put(async (req: express.Request, res: express.Response) => {
        await updateGroup(req, res);
    })
    .delete(async (req: express.Request, res: express.Response) => {
        await deleteGroup(req, res);
    });

router.route('/group')
    .post(async (req: express.Request, res: express.Response) => {
        await createGroup(req, res);
    })
    .get(async (req: express.Request, res: express.Response) => {
        await getAllGroups(req, res);
    });

export { router as groupRouter };
