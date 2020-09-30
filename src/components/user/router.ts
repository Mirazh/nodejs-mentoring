import express from 'express';
import { createUser, deleteUser, getUser, updateUser, getAutoSuggestUsers } from './controller';
import { validateSchema } from '../../utils/validator';

const router = express.Router();

router.route('/user/:id')
    .get((req: express.Request, res: express.Response) => {
        getUser(req, res);
    })
    .put(validateSchema('user'), (req: express.Request, res: express.Response) => {
        updateUser(req, res);
    })
    .delete((req: express.Request, res: express.Response) => {
        deleteUser(req, res);
    });

router.post('/user', validateSchema('user'), (req: express.Request, res: express.Response) => {
    createUser(req, res);
});

router.get('/auto-suggest-users', (req: express.Request, res: express.Response) => {
    getAutoSuggestUsers(req, res);
});

export { router as userRouter };
